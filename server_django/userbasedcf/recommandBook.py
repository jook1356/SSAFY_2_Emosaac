import pandas as pd
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity
import warnings
import sys

sys.path.append('/path/to/server_django/userbasedcf')
from userbasedcf.models import UserBasedCfModel, User, Hit, Score, BookMark, ReadBook

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from django.db import connection


class UserBasedCFBook:
    def __init__(self, type_cd):

        self.type_cd = type_cd

        self.users_result = pd.DataFrame.from_records(
            User.objects.values_list("user_id"),
            columns=["user_no"]
        )

        self.hits_result = pd.DataFrame.from_records(
            Hit.objects.filter(book_no__type_cd=type_cd).values_list("user_no",
                                                                     "book_no"),
            columns=["user_no", "book_no"]
        )

        self.scores_result = pd.DataFrame.from_records(
            Score.objects.filter(score__gte=7, book_no__type_cd=type_cd).values_list("user_no",
                                                                                     "book_no"),
            columns=["user_no", "book_no"]
        )

        self.bookmarks_result = pd.DataFrame.from_records(
            BookMark.objects.filter(book_no__type_cd=type_cd).values_list("user_no",
                                                                          "book_no"),
            columns=["user_no", "book_no"]
        )

        self.reads_result = pd.DataFrame.from_records(
            ReadBook.objects.filter(book_no__type_cd=type_cd).values_list("user_no",
                                                                          "book_no"),
            columns=["user_no", "book_no"]
        )

    def calcSimilarity(self):

        # 조회, 북마크, 읽음, 평점기반으로 유사성 검사
        self.hits_result['read_values'] = 0.5
        self.bookmarks_result['bookmark_values'] = 1
        self.reads_result['read_values'] = 1
        self.scores_result['score_values'] = 1

        users_books = pd.concat(
            [self.users_result, self.hits_result, self.scores_result, self.bookmarks_result, self.reads_result],
            axis=0,
            ignore_index=True,
        )

        pivot_table = pd.pivot_table(
            users_books,
            index=['user_no'],
            columns=['book_no'],
            values=['read_values', 'bookmark_values', 'read_values', 'score_values'],
            aggfunc=sum,
        )

        result = pivot_table.groupby(['book_no'], axis=1).mean()
        result.fillna(0, inplace=True)

        # 사용자 유사도 확인
        user_similarity = pd.DataFrame(cosine_similarity(result), index=result.index, columns=result.index)

        user_based_book = {}
        for target_user in user_similarity.columns:

            sim_users = user_similarity.sort_values(by=target_user, ascending=False).index[1:11]

            # 데이터프레임의 행과 열을 바꾸어서 새로운 데이터프레임 객체 result.T를 생성
            result_T = result.T

            best = []
            for i in sim_users:
                result_sorted = result_T.loc[:, i][
                    ((result_T.loc[:, target_user] == 0.166667) | (
                            result_T.loc[:, target_user] == 0.000000))].sort_values(
                    ascending=False)
                best.append(result_sorted.index[:10].tolist())

            most_common = {}
            for i in range(len(best)):
                for j in best[i]:
                    most_common[j] = most_common.setdefault(j, 0) + 1

            sorted_list = sorted(most_common.items(), key=lambda x: x[1], reverse=True)
            recomm_list = [x[0] for x in sorted_list][:20]
            user_based_book[target_user] = recomm_list

        return user_based_book

    def deleteOriginData(self):
        UserBasedCfModel.objects.filter(type_cd=self.type_cd).delete()

    def save(self):
        user_based_book = self.calcSimilarity()

        self.deleteOriginData()

        for user_no, book_list in user_based_book.items():
            book_list.reverse()
            book_str = ""

            for book_no in book_list:
                book_str += str(book_no)[:-2] + " "

            UserBasedCfModel(
                user_no=User.objects.get(user_id=user_no),
                book_no_list=book_str,
                type_cd=self.type_cd,
                created_dt=datetime.now(),
                modified_dt=datetime.now()
            ).save()


def execute_algorithm(type_cd):
    UserBasedCFBook(type_cd).save()


if __name__ == "__main__":
    execute_algorithm()
