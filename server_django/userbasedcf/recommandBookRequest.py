import pandas as pd
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity

import warnings

from userbasedcf.models import UserBasedCfModel, User, Hit

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()


class UserBasedCFBookRequest:
    def __init__(self, user_id, type_cd):

        self.type_cd = type_cd
        self.user_id = user_id

        self.hits_result = pd.DataFrame.from_records(
            Hit.objects.filter(book_no__type_cd=type_cd).values_list("user_no",
                                                                     "book_no"),
            columns=["user_no", "book_no"]
        )

    def calcSimilarity(self):

        # 조회, 북마크, 읽음, 평점기반으로 유사성 검사
        self.hits_result['values'] = 0.5

        pivot_table = pd.pivot_table(
            self.hits_result,
            index=['user_no'],
            columns=['book_no'],
            values=['values'],
            aggfunc=sum,
        )

        result = pivot_table.groupby(['book_no'], axis=1).mean()
        result.fillna(0, inplace=True)

        # 사용자 유사도 확인
        user_similarity = pd.DataFrame(cosine_similarity(result), index=result.index, columns=result.index)
        user_based_book = {}

        sim_users = user_similarity.sort_values(by=self.user_id, ascending=False).index[1:11]

        result_T = result.T

        best = []
        for i in sim_users:
            result_sorted = result_T.loc[:, i][
                ((result_T.loc[:, self.user_id] == 0.0) | (result_T.loc[:, self.user_id] == 0.5))].sort_values(
                ascending=False)
            best.append(result_sorted.index[:10].tolist())

        most_common = {}
        for i in range(len(best)):
            for j in best[i]:
                most_common[j] = most_common.setdefault(j, 0) + 1

        sorted_list = sorted(most_common.items(), key=lambda x: x[1], reverse=True)
        recomm_list = [x[0] for x in sorted_list][:20]
        user_based_book[self.user_id] = recomm_list

        return user_based_book

    def save(self):
        user_based_book = self.calcSimilarity()

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

            return book_str


def execute_algorithm(user_id, type_cd):
    res = UserBasedCFBookRequest(user_id, type_cd).save()
    return res


if __name__ == "__main__":
    execute_algorithm()
