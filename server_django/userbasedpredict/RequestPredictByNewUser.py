import pandas as pd
from datetime import datetime

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from django.db import connection
import operator
import warnings

import math


warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from recommand.models import UserPredictedGradeModel, User, Book, Score, ReadBook

class UserPredictedGrade:
    def __init__(self, user_id, type_cd):

        self.user_id = user_id
        self.type_cd = type_cd

        # 북 리스트
        self.cursor = connection.cursor()
        self.strSql = "SELECT book_no , title FROM book where type_cd = " + str(self.type_cd)
        self.cursor.execute(self.strSql)
        self.books = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.book_result = pd.DataFrame(data=self.books, columns=cols)

        # # 읽은 책 리스트
        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no, book_no FROM read_book where user_no = " + str(self.user_id)
        self.cursor.execute(self.strSql)
        self.reads = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.readBook_result = pd.DataFrame(data=self.reads, columns=cols)

        # 선호장르에 기반한 평균 평점 리스트
        self.cursor = connection.cursor()
        self.strSql = "select user_no, book_no, book.score as score from hit join book using(book_no) " \
                      "where type_cd = " + str(self.type_cd) + " and user_no = " + str(self.user_id)
        self.cursor.execute(self.strSql)
        self.scores = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.hit_score_list = pd.DataFrame(data=self.scores, columns=cols)

        # 평점 리스트
        self.cursor = connection.cursor()
        self.strSql = "select user_no, book_no, score.score as score " \
                      "from score join book using(book_no) where book.type_cd = " + str(self.type_cd)
        self.cursor.execute(self.strSql)
        self.scores = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.score_result = pd.DataFrame(data=self.scores, columns=cols)
        self.user_score_list = self.score_result

        # hit_score_list에서 user_no와 book_no가 score_result에 존재하는 행들만 선택
        mask = (self.hit_score_list['user_no'].isin(self.score_result['user_no'])) & \
               (self.hit_score_list['book_no'].isin(self.score_result['book_no']))

        # hit_score_list에서 선택된 행들과 score_result를 조인하여 score 값을 조정한 후 합침
        self.merged_df = pd.merge(self.hit_score_list, self.score_result, on=['user_no', 'book_no'], how='outer')
        self.merged_df['score'] = self.merged_df['score_y'].fillna(self.merged_df['score_x'])
        self.merged_df.drop(['score_x', 'score_y'], axis=1, inplace=True)

        self.score_result = self.merged_df

        connection.commit()
        connection.close()

        # Create Pivot Table
        self.rating_df = self.score_result.pivot_table('score', index='book_no', columns='user_no').fillna(0)

        # Create Cosine Silmilarity Dataframe
        self.item_sim = cosine_similarity(self.rating_df, self.rating_df)

        self.book_sim_df = pd.DataFrame(data=self.item_sim, index=self.rating_df.index, columns=self.rating_df.index)

    # def. User 별 도서 예상 평점 계산
    def predict_rating_topsim(self, ratings_arr, item_sim_arr, n=10): # n: 이웃의 수
        predict_rating_np = np.zeros(ratings_arr.shape)

        for col in range(ratings_arr.shape[1]):
            # 유사도가 큰 순으로 n개의 데이터 행렬의 index 반환
            top_n_items = [np.argsort(item_sim_arr[:, col])[:-n - 1:-1]]

            # 각 item 별로 전체 사용자들의 예측 평점
            for row in range(ratings_arr.shape[0]):
                predict_rating_np[row, col] = item_sim_arr[col, :][top_n_items].dot(
                    ratings_arr[row, :][top_n_items].T)
                predict_rating_np[row, col] /= np.sum(item_sim_arr[col, :][top_n_items])

        return predict_rating_np

    # def. User "000"이(가) 읽은 도서 리스트
    def get_user_book_list(self, user_id):
        bg_user = self.user_score_list.loc[self.user_score_list['user_no'] == user_id]
        # print(bg_user)
        bg_user_book = bg_user['book_no']
        user_book_list = bg_user_book.tolist()

        return user_book_list

    def make_predicted_dic(self):
        # 모든 사용자 리스트
        user_list = self.rating_df.columns.tolist()

        # 모든 사용자에 대해 모든 도서 예상 평점 구하기
        rating_df_T = self.rating_df.transpose()
        predict_rating_np = self.predict_rating_topsim(rating_df_T.values, self.book_sim_df.values, n=5)


        # 예상 평점 np를 dataframe으로 변환
        predict_rating_df = pd.DataFrame(data=predict_rating_np, index=rating_df_T.index, columns=rating_df_T.columns)

        # print(predict_rating_df)

        # 결과 딕셔너리 생성
        user_book_dic = {}

        # 해당 사용자의 예상 평점을 높은 순서대로 가져오기
        user_predict_rating_df = predict_rating_df.loc[self.user_id, :].sort_values(ascending=False)
        print(user_predict_rating_df)
        # 예상 평점 df를 list로 변환
        user_predict_rating_list = user_predict_rating_df.index.tolist()
        # 사용자가 읽은 도서 리스트 받아오기
        target_user_book_list = self.get_user_book_list(self.user_id)

        # 예상 평점 리스트에서 사용자가 이미 읽은 도서 제거

        not_read_score_list = []
        for book_no, score in user_predict_rating_df.items():
            if book_no not in target_user_book_list and len(not_read_score_list) < 30:
                not_read_score_list.append({'book_no': book_no, 'score': score})

        # Result) 모든 User에 대한 상위 예상 평점 도서 리스트 추천
        user_book_dic[self.user_id] = not_read_score_list

        return user_book_dic

    def save_list(self):
        user_predicted_book_dic = self.make_predicted_dic()

        book_str = ""

        for user_no, book_isbn_list in user_predicted_book_dic.items():

            for book in book_isbn_list:
                if book['score'] == 0 or math.isnan(book['score']):
                    continue
                UserPredictedGradeModel(
                    user_no=User.objects.get(user_id=user_no),
                    book_no=Book.objects.get(book_no=book['book_no']),
                    predict_score = book['score']
                ).save()
                book_str += str(book['book_no']) + " "

        return book_str


def execute_algorithm(user_id, type_cd):
    res = UserPredictedGrade(user_id, type_cd).save_list()
    return res

if __name__ == "__main__":
    execute_algorithm()