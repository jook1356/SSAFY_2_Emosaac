# from emosaac.SECRET_KEY import Connection
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import operator
import warnings

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from recommand.models import User
# from book.models import Book
from recommand.models import UserBasedCFModel, Book


class UserBasedCF:
    def __init__(self):
        self.connection = Connection()
        self.cursor = self.connection.cursor()
        self.sql = "select user_email, book_isbn, book_grade from Book_Grade"
        self.cursor.execute(self.sql)
        self.result = self.cursor.fetchall()
        self.book_rating = pd.DataFrame(self.result)

    # 사용자 기반 필터링
    def user_based_cf(self):
        title_user = self.book_rating.pivot_table('book_grade', index='user_email', columns='book_isbn')
        title_user.fillna(0, inplace=True)

        # 유저와 유저 간의 유사도
        user_based_collab = cosine_similarity(title_user, title_user)
        user_based_collab = pd.DataFrame(user_based_collab, index=title_user.index, columns=title_user.index)

        user_book_dic = {}
        for target_user in user_based_collab.columns:

            sim_users = user_based_collab.sort_values(by=target_user, ascending=False).index[1:11]

            title_user_T = title_user.T
            best = []
            for i in sim_users:
                # 유사도가 높은 10명의 사용자들이 평가점수를 높게 주었던 item list(상위 10개)를 가져온다.
                # user가 평가하지 않았던 아이템을 추천해야한다.
                result_sorted = title_user_T.loc[:, i][(title_user_T.loc[:, target_user] == 0)].sort_values(
                    ascending=False)
                best.append(result_sorted.index[:10].tolist())

            most_common = {}
            for i in range(len(best)):
                for j in best[i]:
                    # dic에 있다면 count 추가
                    if j in most_common:
                        most_common[j] += 1
                    # 아니라면 count 1
                    else:
                        most_common[j] = 1

            # 몇명이나 선택했냐를 기준으로 판단
            # key=operator.itemgetter(1) - 튜플의 2번째 요소로 sort
            # reverse=True 역순
            sorted_list = sorted(most_common.items(), key=operator.itemgetter(1), reverse=True)
            recomm_list = [x[0] for x in sorted_list][:20]
            user_book_dic[target_user] = recomm_list
        return user_book_dic

    def save_list(self):
        user_book_dic = self.user_based_cf()

        UserBasedCFModel.objects.all().delete()

        for user_email, book_isbn_list in user_book_dic.items():
            book_isbn_list.reverse()
            for book_isbn in book_isbn_list:
                UserBasedCFModel(
                    user_email=User.objects.get(user_email=user_email),
                    book_isbn=Book.objects.get(book_isbn=book_isbn)
                ).save()



def execute_algorithm():
    UserBasedCF().save_list()

def test():
    print(1)

if __name__ == "__main__":
    execute_algorithm()