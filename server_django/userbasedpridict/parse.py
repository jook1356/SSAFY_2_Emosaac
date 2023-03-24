import pandas as pd
from datetime import datetime

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from django.db import connection
import operator
import warnings

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from recommand.models import UserPredictedGradeModel, User, Book, Score, ReadBook

from django.db import connection

from surprise import SVD # SVD를 사용해 데이터를 학습
from surprise import Reader
from surprise import Dataset
from surprise.model_selection import train_test_split # 데이터를 학습용과 훈련용으로 분할

def DataView():
    books = BookListView()
    scores = ScoreListView()

    userId = 3
    unseen_books = get_unseen_surprise(scores, books, userId)

    reader = Reader(rating_scale=(0.1, 10.0))
    print("===============")
    data = Dataset.load_from_df(scores, reader)
    train_set, test_set = train_test_split(data, test_size=0.25, random_state=1004)

    algo = SVD()
    algo.fit(train_set)
    pred = algo.test(test_set)

    # accuracy.rmse(pred)
    # def recomm_book_by_surprise(algo, userId, unseen_books, books, top_n=10):
    recomm_book_by_surprise(algo, userId, unseen_books, books, 10)

    return


def BookListView():
    # user select test
    try:
        cursor = connection.cursor()
        strSql = "SELECT book_no , title FROM book where type_cd = 0" # 웹툰0, 웹소설1
        cursor.execute(strSql)
        books = cursor.fetchall()
        result = pd.DataFrame(books,  columns = ['book_id', 'title'])

        connection.commit()
        connection.close()

        print("=========books=========")
        # print(f"{result}")

    except:
        connection.rollback()

    return result

def ReadBookListView():
    try:
        cursor = connection.cursor()
        strSql = "SELECT user_no, book_no FROM read_book "
        cursor.execute(strSql)
        readBook = cursor.fetchall()
        result = pd.DataFrame(readBook , columns = ['user_id', 'book_id'])

        connection.commit()
        connection.close()

        print("=========read book=========")
        print(f"{result}")

    except:
        connection.rollback()
    return result

def ScoreListView():
    try:
        cursor = connection.cursor()
        strSql = "select user_no, book_no, score.score from score join book using(book_no) where book.type_cd = 0"
        cursor.execute(strSql)
        scores = cursor.fetchall()
        result = pd.DataFrame(scores , columns = ['user_id', 'book_id', 'rating'])


        connection.commit()
        connection.close()

        print("=========scores=========")
        # print(f"{result}")

        execute_surprise(result)

    except:
        connection.rollback()

    return result

def execute_surprise(df):
    print(f"{df}")  # userNo, bookNo, score

    reader = Reader(rating_scale=(0.1, 10.0))
    print("===============")
    data = Dataset.load_from_df(df, reader)
    train_set, test_set = train_test_split(data, test_size=0.25, random_state=1004)


    algo = SVD()
    algo.fit(train_set)
    pred = algo.test(test_set)

    # accuracy.rmse(pred)

    user_id = str(6)
    item_id = str(19023)

    pred = algo.predict(user_id, item_id)

    print(f'예측 평점: {pred.est}')
    print("===============")
    return

# 아직 보지 않은 영화 리스트 함수
def get_unseen_surprise(scores, books, userId):
    # 특정 userId가 평점을 매긴 모든 영화 리스트
    seen_books = scores[scores['user_id'] == userId]['book_id'].tolist()

    print(seen_books)

    total_books = books['book_id'].tolist()

    unseen_books = [ book for book in total_books if book not in seen_books]

    total_book_cnt = len(total_books)
    seen_cnt = len(seen_books)
    unseen_cnt = len(unseen_books)

    print(f"전체 책 수: {total_book_cnt}, 평점 매긴 책 수: {seen_cnt}, 추천 대상 책 수: {unseen_cnt}")
    return unseen_books

def recomm_book_by_surprise(algo, userId, unseen_books, books, top_n):

    # 아직 보지 않은 책의 예측 평점
    predictions = []
    for bookId in unseen_books:
        predictions.append(algo.predict(str(userId), str(bookId)))

    # print(predictions)

    # 리스트 내의 prediction 객체의 est를 기준으로 내림차순 정렬
    def sortkey_est(pred):
        return pred.est

    predictions.sort(key=sortkey_est, reverse=True)

    # 상위 top_n개의 prediction 객체
    top_predictions = predictions[:top_n]

    # 책 아이디, 제목, 예측 평점 출력
    print(f"Top-{top_n} 추천 책 리스트")

    for pred in top_predictions:
        book_id = int(pred.iid)
        book_title = books[books["book_id"] == book_id]["title"].tolist()
        book_rating = pred.est

        print(f"{book_title}: {book_rating:.2f}")

if __name__ == "__main__":
    execute_surprise()

# ratings_arr.dot(item_sim_arr) : 평점 * 책 유사도
# ratings_arr : 사용자 u의 아이템 i와 가장 유사도가 높은 Top_N개 아이템에 대한 실제 평점 벡터
# item_sim_arr : 아이템 i와 가장 유사도가 높은 Top_N개 아이템의 유사도 벡터

# 개인화된 예측 평점
# 평점 value와 유사도 value만 뽑아서 대입

# 개인별로 계산된 예측 평점
# ratings_pred_matrix

    # trainset, testset = train_test_split(scores, train_size=.25, random_state=0)
    # algo = SVD(n_factors=50, random_state=0)

    # data = Dataset.load_from_df(scores)
    # algo = SVD(n_factors=50, random_state=0)
    # algo.fit(data)
    #
    # # algo.fit(trainset)
    # # predictions = algo.test(testset)
    # # accuracy.rmse(predictions)
    #
    # print(predictions)
    # print(accuracy.rmse(predictions))
