import pandas as pd
from datetime import datetime
from sklearn.metrics.pairwise import cosine_similarity
import warnings
import sys
sys.path.append('/path/to/server_django/userbasedcf')
from userbasedcf.models import UserBasedCfModel, User


warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()


from django.db import connection

# 나이, 성별 필터링 되어있음-> 결과가 안나와서 필터링 뺏음...

class UserBasedCFBook:
    def __init__(self, type_cd):

        self.type_cd = type_cd

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_id ,age,gender,SUBSTRING_INDEX(favorite_webtoon_genre, '^', 1) as genre FROM user"
        # self.strSql = "SELECT user_id ,age,gender FROM user"
        self.cursor.execute(self.strSql)
        self.users = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.users_result = pd.DataFrame(data=self.users, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no , hit.book_no FROM hit join book on hit.book_no = book.book_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.hits = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.hits_result = pd.DataFrame(data=self.hits, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no , score.book_no, score.score FROM score join book on score.book_no = book.book_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.scores = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.scores_result = pd.DataFrame(data=self.scores, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no, book_mark.book_no FROM book_mark join book on book_mark.book_no = book.book_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.bookmarks = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.bookmarks_result = pd.DataFrame(self.bookmarks, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_no , read_book.book_no FROM read_book join book on read_book.book_no = book.book_no where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.reads = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.reads_result = pd.DataFrame(self.reads, columns=cols)

        connection.commit()
        connection.close()

    def calcSimilarity(self):

        # 조회, 북마크, 읽음, 평점기반으로 유사성 검사
        self.hits_result['values'] = 0.5
        self.bookmarks_result['values'] = 1
        self.reads_result['values'] = 1


        users_books = pd.merge(
            self.hits_result, self.bookmarks_result, how='outer', on=["user_no", "book_no"]
        )

        users_books = pd.merge(
            users_books, self.scores_result, how='outer', on=["user_no", "book_no"]
        )

        users_books = pd.merge(
            users_books, self.reads_result, how='outer', on=["user_no", "book_no"]
        )

        # 테스트중
        # 문제: 나이가 같거나 성별이 같아야한다는 필터링 조건을 넣으니 결과가 안나오는 문제 발생..
        users_books = pd.merge(
            users_books, self.users_result, how='left', left_on=["user_no"], right_on=["user_id"]
        )

        # print(users_books)

        # Create pivot table with age and gender
        pivot_table = pd.pivot_table(
            users_books,
            index=['user_no', 'age', 'gender'],
            columns=['book_no'],
            values=['values_x', 'values_y', 'score', 'values'],
            aggfunc=sum,
        )

        # print(pivot_table)
        print("/************")
        # pivot_table = pd.pivot_table(
        #     users_books,
        #     index=['user_no'],
        #     columns=['book_no'],
        #     values=['values_x', 'values_y', 'score' ,'values'],
        #     aggfunc=sum,
        # )

        # result = pivot_table.groupby(['book_no'], axis=1).sum()
        # result.fillna(0, inplace=True)
        # print(result)
        result = pivot_table.groupby(['book_no'], axis=1).mean()
        result.fillna(0, inplace=True)
        print(result)

        # 사용자 유사도 확인
        user_similarity = pd.DataFrame(cosine_similarity(result), index=result.index, columns=result.index)
        print("////////please")
        # print(user_similarity[(user_similarity.index.get_level_values('age') == 20)])

        user_based_book = {}
        for target_user in user_similarity.columns:

            # target_user: 추천 받을 대상
            # sim_users: 추천 받을 대상과 유사한 유저

            target_age = target_user[1]
            target_gender = target_user[2]

            # 나이와 성별 필터링 적용
            user_similarity = user_similarity[(user_similarity.index.get_level_values('age') == target_age) & (user_similarity.index.get_level_values('gender') == target_gender)]
            sim_users = user_similarity.sort_values(by=target_user, ascending=False).index[1:11]
            # print(sim_users)

            # 데이터프레임의 행과 열을 바꾸어서 새로운 데이터프레임 객체 result.T를 생성
            result_T = result.T
            print("result_T")
            print(result_T)

            best = []
            for i in sim_users:

                # 유사도가 높은 10명의 사용자들이 평가점수를 높게 주었던 item list(상위 10개)를 가져온다.
                # user가 읽지 않은 아이템을 추천해야한다.
                # 1) 이미 평점을 남긴 책: 데이터프레임에서 target_user열의 값이 0인 행을 찾은 후, i번째 열의 값을 선택
                # 2) - 조회만 한 책: 데이터프레임에서 target_user열의 값이 0.5인 행을 찾은 후, i번째 열의 값을 선택
                #    - 0.5는 조회에 기반한 점수인데, 단순 조회를 한것만으로 읽었다고 가정할수 없어 추천 목록에서 제외하지 않았음
                # 0.5-> 0.125 : sum->mean
                result_sorted = result_T.loc[:, i][
                    ((result_T.loc[:, target_user] == 0) | (result_T.loc[:, target_user] == 0.125) | (result_T.loc[:, target_user] == 0.000))].sort_values(
                    ascending=False)
                best.append(result_sorted.index[:10].tolist())

            print(best)
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
        UserBasedCfModel.objects.filter(type_cd=self.type_cd).delete()

    def save(self):
        user_based_book = self.calcSimilarity()
        print(user_based_book)

        # 기존 데이터 지우기
        self.deleteOriginData()

        for user_no, book_list in user_based_book.items():
            book_list.reverse()
            book_str = ""

            for book_no in book_list:
                book_str += str(book_no) + " "

            UserBasedCfModel(
                user_no=User.objects.get(user_id=user_no[0]),
                book_no_list=book_str,
                type_cd=self.type_cd,
                created_dt=datetime.now(),
                modified_dt=datetime.now()
            ).save()
            
            # //////////////필터 적용안된 경우//////////////
            # UserBasedCfModel(
            #     user_no=User.objects.get(user_id=user_no),
            #     book_no_list=book_str,
            #     type_cd=0,
            #     created_dt=datetime.now(),
            #     modified_dt=datetime.now()
            # ).save()

        # print(user_based_book)


def execute_algorithm(type_cd):
    print("---------------------------------------------------")
    UserBasedCFBook(type_cd).save()
    print("---------------------------------------------------")


if __name__ == "__main__":
    execute_algorithm()
