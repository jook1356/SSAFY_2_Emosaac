import pandas as pd
from datetime import datetime
import warnings

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from userbasedcf.models import TotalByAgeAndGenderModel

from django.db import connection


class totalBookByAgeAndGender():
    def __init__(self, type_cd):

        self.type_cd = type_cd

        self.cursor = connection.cursor()
        self.strSql = "SELECT age,gender FROM user"
        self.cursor.execute(self.strSql)
        self.users = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.users_result = pd.DataFrame(data=self.users, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT  hit.book_no, user.age, user.gender FROM hit " \
                      "join book on hit.book_no = book.book_no " \
                      "join user on user.user_id = hit.user_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.hits = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.hits_result = pd.DataFrame(data=self.hits, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT score.book_no, score.score, user.age, user.gender FROM score " \
                      "join book on score.book_no = book.book_no " \
                      "join user on user.user_id = score.user_no " \
                      "where score.score>=8 and book.type_cd=" + str(type_cd)
        self.cursor.execute(self.strSql)
        self.scores = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.scores_result = pd.DataFrame(data=self.scores, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT book_mark.book_no ,user.age, user.gender FROM book_mark " \
                      "join book on book_mark.book_no = book.book_no " \
                      "join user on user.user_id = book_mark.user_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.bookmarks = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.bookmarks_result = pd.DataFrame(self.bookmarks, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT read_book.book_no, user.age, user.gender FROM read_book " \
                      "join book on read_book.book_no = book.book_no " \
                      "join user on user.user_id = read_book.user_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.reads = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.reads_result = pd.DataFrame(self.reads, columns=cols)

        connection.commit()
        connection.close()

    def calcSimilarity(self):

        # 조회, 북마크, 읽음 처리 기반으로 유사성 검사
        self.reads_result['values'] = 1
        self.hits_result['values'] = 0.5
        self.bookmarks_result['values'] = 1
        self.scores_result['score'] = 1

        users_books = pd.merge(
            self.hits_result, self.bookmarks_result, how='outer', on=["age", "gender", "book_no"]
        )

        users_books = pd.merge(
            users_books, self.reads_result, how='outer', on=["age", "gender", "book_no"]
        )

        users_books = pd.merge(
            users_books, self.scores_result, how='outer', on=["age", "gender", "book_no"]
        )

        # print(users_books)

        # Create pivot table with age and gender
        pivot_table = pd.pivot_table(
            users_books,
            index=['age', 'gender'],
            columns=['book_no'],
            values=['values_x', 'values_y', 'values', 'score'],
            aggfunc=sum,
        )

        # print(pivot_table)
        print("/************")

        result = pivot_table.groupby(['book_no'], axis=1).mean()
        result.fillna(0, inplace=True)
        # print(result)

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
                book_str += str(book_no) + " "

            TotalByAgeAndGenderModel(
                age=user[0],
                gender=user[1],
                book_no_list=book_str,
                type_cd=self.type_cd,
                created_dt=datetime.now(),
                modified_dt=datetime.now()
            ).save()

        # print(user_based_book)


def execute_algorithm(type_cd):
    totalBookByAgeAndGender(type_cd).save()
    print("---------------------------------------------------")


if __name__ == "__main__":
    execute_algorithm()