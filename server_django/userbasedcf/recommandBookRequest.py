import pandas as pd
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity

import warnings

from userbasedcf.models import UserBasedCfModel, User

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from django.db import connection


# 나이, 성별 필터링 안되어있음

class UserBasedCFBookRequest:
    def __init__(self, user_id, type_cd):

        self.type_cd = type_cd
        self.user_id = user_id

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no , hit.book_no FROM hit join book on hit.book_no = book.book_no where book.type_cd=" + str(type_cd)
        self.cursor.execute(self.strSql)
        self.hits = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.hits_result = pd.DataFrame(data=self.hits, columns=cols)

        connection.commit()
        connection.close()

    def calcSimilarity(self):

        # 조회, 북마크, 읽음, 평점기반으로 유사성 검사
        self.hits_result['values'] = 0.5


        # print(pivot_table)
        print("/************")
        pivot_table = pd.pivot_table(
            self.hits_result,
            index=['user_no'],
            columns=['book_no'],
            values=['values'],
            aggfunc=sum,
        )

        result = pivot_table.groupby(['book_no'], axis=1).mean()
        result.fillna(0, inplace=True)
        print(result)

        # 사용자 유사도 확인
        user_similarity = pd.DataFrame(cosine_similarity(result), index=result.index, columns=result.index)
        user_based_book = {}
        # target_user: 추천 받을 대상
        # sim_users: 추천 받을 대상과 유사한 유저

        sim_users = user_similarity.sort_values(by=self.user_id, ascending=False).index[1:11]

        # 데이터프레임의 행과 열을 바꾸어서 새로운 데이터프레임 객체 result.T를 생성
        result_T = result.T
        print("result_T")
        print(result_T)

        best = []
        for i in sim_users:
            result_sorted = result_T.loc[:, i][
                ((result_T.loc[:, self.user_id] == 0) | (result_T.loc[:, self.user_id] == 0.125) | (
                        result_T.loc[:, self.user_id] == 0.000))].sort_values(
                ascending=False)
            best.append(result_sorted.index[:10].tolist())

        print(best)
        most_common = {}
        for i in range(len(best)):
            for j in best[i]:
                # setdefault: 키 값으로 j가 이미 있으면 원래 값에 1 추가, 없으면 1
                most_common[j] = most_common.setdefault(j, 0) + 1

        #  도서를 추천한 사용자의 수에 따라 정렬하여 상위 20개의 도서를 추천 목록으로 저장
        # key=lambda x: x[1] : 정렬 기준으로 인덱스 1번째 값을 가져온다
        sorted_list = sorted(most_common.items(), key=lambda x: x[1], reverse=True)
        # x[0]: sorted_list는 (18325, 2)와 같은 튜플의 리스트이므로 첫번째 인덱스인 책 번호만 가져온다
        recomm_list = [x[0] for x in sorted_list][:20]
        user_based_book[self.user_id] = recomm_list

        return user_based_book

    def save(self):
        user_based_book = self.calcSimilarity()
        print(user_based_book)

        for user_no, book_list in user_based_book.items():
            book_list.reverse()
            book_str = ""

            for book_no in book_list:
                book_str += str(book_no) + " "

            # //////////////필터 적용안된 경우//////////////
            UserBasedCfModel(
                user_no=User.objects.get(user_id=user_no),
                book_no_list=book_str,
                type_cd=self.type_cd,
                created_dt=datetime.now(),
                modified_dt=datetime.now()
            ).save()

            return book_str
        # print(user_based_book)


def execute_algorithm(user_id, type_cd):
    print("--------------------webtoonRequest-------------------------------")
    res = UserBasedCFBookRequest(user_id, type_cd).save()
    return res
    print("---------------------------------------------------")


if __name__ == "__main__":
    execute_algorithm()
