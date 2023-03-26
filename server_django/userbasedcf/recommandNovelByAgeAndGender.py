import pandas as pd
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity
import warnings

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from userbasedcf.models import UserBasedCfByAgeGenderModel

from django.db import connection

# 사용 안함
class UserBasedCFNovelByAgeAndGender:
    def __init__(self):

        self.cursor = connection.cursor()
        self.strSql = "SELECT age,gender FROM user"
        self.cursor.execute(self.strSql)
        self.users = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.users_result = pd.DataFrame(data=self.users, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT  hit.book_no, user.age, user.gender FROM hit " \
                      "join book on hit.book_no = book.book_no " \
                      "join user on user.user_id = hit.user_no where book.type_cd=1"
        self.cursor.execute(self.strSql)
        self.hits = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.hits_result = pd.DataFrame(data=self.hits, columns=cols)
        # print(self.hits_result)

        self.cursor = connection.cursor()
        self.strSql = "SELECT score.book_no, score.score, user.age, user.gender FROM score " \
                      "join book on score.book_no = book.book_no " \
                      "join user on user.user_id = score.user_no  where book.type_cd=1"
        self.cursor.execute(self.strSql)
        self.scores = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.scores_result = pd.DataFrame(data=self.scores, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT book_mark.book_no ,user.age, user.gender FROM book_mark " \
                      "join book on book_mark.book_no = book.book_no " \
                      "join user on user.user_id = book_mark.user_no where book.type_cd=1"
        self.cursor.execute(self.strSql)
        self.bookmarks = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.bookmarks_result = pd.DataFrame(self.bookmarks, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT read_book.book_no, user.age, user.gender FROM read_book " \
                      "join book on read_book.book_no = book.book_no " \
                      "join user on user.user_id = read_book.user_no  where book.type_cd=1"
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
        # 스코어를 1로 줘야할지/ 점수 그대로 넣어야 할지 문제...
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

        print(users_books)

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

        result = pivot_table.groupby(['book_no'], axis=1).sum()
        result.fillna(0, inplace=True)
        print(result)

        # 사용자 유사도 확인
        user_similarity = pd.DataFrame(cosine_similarity(result), index=result.index, columns=result.index)
        print("////////please")

        user_based_book = {}
        for target_user in user_similarity.columns:

            # target_user: 추천 받을 대상
            # sim_users: 추천 받을 대상과 유사한 유저

            sim_users = user_similarity.sort_values(by=target_user, ascending=False).index[1:11]
            # print(sim_users)

            # 데이터프레임의 행과 열을 바꾸어서 새로운 데이터프레임 객체 result.T를 생성
            result_T = result.T

            best = []
            for i in sim_users:
                # users_books_filtered = users_books[users_books['gender'] == user_gender]

                # 유사도가 높은 10명의 사용자들이 평가점수를 높게 주었던 item list(상위 10개)를 가져온다.
                # user가 읽지 않은 아이템을 추천해야한다.
                # 1) 이미 평점을 남긴 책: 데이터프레임에서 target_user열의 값이 0인 행을 찾은 후, i번째 열의 값을 선택
                # 2) - 조회만 한 책: 데이터프레임에서 target_user열의 값이 0.5인 행을 찾은 후, i번째 열의 값을 선택
                #    - 0.5는 조회에 기반한 점수인데, 단순 조회를 한것만으로 읽었다고 가정할수 없어 추천 목록에서 제외하지 않았음
                result_sorted = result_T.loc[:, i][
                    ((result_T.loc[:, target_user] == 0.0) | (result_T.loc[:, target_user] == 0.5))].sort_values(
                    ascending=False)
                best.append(result_sorted.index[:10].tolist())

            most_common = {}
            for i in range(len(best)):
                for j in best[i]:
                    # setdefault: 키 값으로 j가 이미 있으면 원래 값에 1 추가, 없으면 1
                    # 키의 값은 그 도서를 추천한 유저의 수
                    most_common[j] = most_common.setdefault(j, 0) + 1

            #  도서를 추천한 사용자의 수에 따라 정렬하여 상위 20개의 도서를 추천 목록으로 저장
            # key=lambda x: x[1] : 정렬 기준으로 인덱스 1번째 값을 가져온다
            sorted_list = sorted(most_common.items(), key=lambda x: x[1], reverse=True)
            # x[0]: sorted_list는 (18325, 2)와 같은 튜플의 리스트이므로 첫번째 인덱스인 책 번호만 가져온다
            recomm_list = [x[0] for x in sorted_list][:20]
            user_based_book[target_user] = recomm_list

        return user_based_book

    def deleteOriginData(self):
        # 기존 데이터 지우기
        UserBasedCfByAgeGenderModel.objects.filter(type_cd=1).delete()

    def save(self):
        user_based_book = self.calcSimilarity()

        # 기존 데이터 지우기
        self.deleteOriginData()

        for user, book_list in user_based_book.items():
            book_list.reverse()
            book_str = ""

            for book_no in book_list:
                book_str += str(book_no) + " "

            UserBasedCfByAgeGenderModel(
                age=user[0],
                gender=user[1],
                book_no_list=book_str,
                type_cd=1,
                created_dt=datetime.now(),
                modified_dt=datetime.now()
            ).save()

        print(user_based_book)


def execute_algorithm():
    UserBasedCFNovelByAgeAndGender().save()


if __name__ == "__main__":
    execute_algorithm()
