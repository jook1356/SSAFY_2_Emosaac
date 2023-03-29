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

# 여기는 디비를 지웠다가 다시 생성하므로 배치에 사용합니다.

# 조회수 + 내 평점으로 하기

class UserPredictedGrade:
    def __init__(self, type_cd):

        self.type_cd = type_cd

        # 북 리스트
        self.cursor = connection.cursor()
        self.strSql = "SELECT book_no , title FROM book where type_cd = " + str(self.type_cd)
        self.cursor.execute(self.strSql)
        self.books = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.book_result = pd.DataFrame(data=self.books, columns=cols)

        # 읽은 책 리스트
        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no, book_no FROM read_book"
        self.cursor.execute(self.strSql)
        self.reads = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.readBook_result = pd.DataFrame(data=self.reads, columns=cols)

        # 조회수 리스트
        self.cursor = connection.cursor()
        self.strSql = "select user_no, book_no, book.score as score from hit join book using(book_no) where type_cd = " + str(self.type_cd)
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
        # bg_user = self.score_result.loc[self.score_result['user_no'] == user_id]
        bg_user = self.user_score_list.loc[self.user_score_list['user_no'] == user_id]

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

        # 결과 딕셔너리 생성
        user_book_dic = {}

        # 사용자 한명한명에 대해 리스트 저장하기
        for target_user in user_list:
            # 해당 사용자의 예상 평점을 높은 순서대로 가져오기
            user_predict_rating_df = predict_rating_df.loc[target_user, :].sort_values(ascending=False)
            # 예상 평점 df를 list로 변환
            user_predict_rating_list = user_predict_rating_df.index.tolist()
            # 사용자가 읽은 도서 리스트 받아오기
            target_user_book_list = self.get_user_book_list(target_user)

            # 예상 평점 리스트에서 사용자가 이미 읽은 도서 제거
            # not_read_rating_list = [i for i in user_predict_rating_list if i not in target_user_book_list][:20]

            not_read_score_list = []
            for book_no, score in user_predict_rating_df.items():
                # if book_no not in target_user_book_list and len(not_read_score_list) < 30:
                if book_no not in target_user_book_list:
                    not_read_score_list.append({'book_no': book_no, 'score': score})

            # Result) 모든 User에 대한 상위 예상 평점 도서 리스트 추천
            user_book_dic[target_user] = not_read_score_list

        return user_book_dic

    def save_list(self):
        user_predicted_book_dic = self.make_predicted_dic()

        # UserPredictedGradeModel.objects.all().delete()

        for user_no, book_isbn_list in user_predicted_book_dic.items():

            for book in book_isbn_list:
                if book['score'] == 0 or math.isnan(book['score']):
                    continue
                if book['score'] < 5 : # 추후 8로 변경 예정
                    break
                # print(book['book_no'], book['score'])
                UserPredictedGradeModel(
                    user_no=User.objects.get(user_id=user_no),
                    book_no=Book.objects.get(book_no=book['book_no']),
                    predict_score = round(book['score'],2),
                    created_dt=datetime.now(),
                    modified_dt=datetime.now()
                ).save()


def execute_algorithm(type_cd):
    UserPredictedGrade(type_cd).save_list()


if __name__ == "__main__":
    execute_algorithm()