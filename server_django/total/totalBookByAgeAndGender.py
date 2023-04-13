import pandas as pd
from datetime import datetime
import warnings

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from userbasedcf.models import TotalByAgeAndGenderModel, User, Hit, Score, BookMark, ReadBook

from django.db import connection


class totalBookByAgeAndGender():
    def __init__(self, type_cd):

        self.type_cd = type_cd


        self.users_result = pd.DataFrame.from_records(
            User.objects.values_list("age", "gender"),
            columns=["age", "gender"]
        )


        self.hits_result = pd.DataFrame.from_records(
            Hit.objects.filter(book_no__type_cd=type_cd).values_list("user_no__age", "user_no__gender", "book_no"),
            columns=["age", "gender", "book_no"]
        )



        self.scores_result = pd.DataFrame.from_records(
            Score.objects.filter(score__gte=7, book_no__type_cd=type_cd).values_list("user_no__age", "user_no__gender", "book_no"),
            columns=["age", "gender", "book_no"]
        )



        self.bookmarks_result = pd.DataFrame.from_records(
            BookMark.objects.filter(book_no__type_cd=type_cd).values_list("user_no__age", "user_no__gender", "book_no"),
            columns=["age", "gender", "book_no"]
        )


        self.reads_result = pd.DataFrame.from_records(
            ReadBook.objects.filter(book_no__type_cd=type_cd).values_list("user_no__age", "user_no__gender", "book_no"),
            columns=["age", "gender", "book_no"]
        )

    def calcSimilarity(self):

        # 조회, 북마크, 읽음 처리 기반으로 유사성 검사
        self.reads_result['read_values'] = 1
        self.hits_result['hit_values'] = 0.5
        self.bookmarks_result['bookmark_values'] = 1
        self.scores_result['score_values'] = 1


        users_books = pd.concat(
            [self.users_result, self.hits_result, self.scores_result, self.bookmarks_result, self.reads_result],
            axis=0,
            ignore_index=True,
        )

        pivot_table = pd.pivot_table(
            users_books,
            index=['age', 'gender'],
            columns=['book_no'],
            values=['read_values', 'hit_values', 'bookmark_values', 'score_values'],
            aggfunc=sum,
        )


        result = pivot_table.groupby(['book_no'], axis=1).mean()
        result.fillna(0, inplace=True)

        user_based_book={}
        for index, row in result.iterrows():
            # 높은 점수의 20개 구하기
            top_books = row.nlargest(20).index.tolist()
            # print(f"For user {index}, top 20 books: {top_books}")
            user_based_book[index] = top_books

        return user_based_book

    def deleteOriginData(self):
        # 기존 데이터 지우기
        TotalByAgeAndGenderModel.objects.filter(type_cd=self.type_cd).delete()

    def save(self):
        user_based_book = self.calcSimilarity()

        # 기존 데이터 지우기
        self.deleteOriginData()

        for user, book_list in user_based_book.items():
            book_str=""
            for book_no in book_list:
                book_str += str(book_no)[:-2] + " "

            TotalByAgeAndGenderModel(
                age=user[0],
                gender=user[1],
                book_no_list=book_str,
                type_cd=self.type_cd,
                created_dt=datetime.now(),
                modified_dt=datetime.now()
            ).save()

def execute_algorithm(type_cd):
    totalBookByAgeAndGender(type_cd).save()
    print("---------------------------------------------------")


if __name__ == "__main__":
    execute_algorithm()