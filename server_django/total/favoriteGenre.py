#배치로 선호 장르 반영하기!!
import pandas as pd
from django.db import connection

from userbasedcf.models import User


class favoriteGenre():
    def __init__(self, type_cd):

        self.type_cd = type_cd

        self.cursor = connection.cursor()
        self.strSql = "SELECT user_id as user_no FROM user where favorite_novel_genre!=null and favorite_webtoon_genre!=null"
        self.cursor.execute(self.strSql)
        self.users = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.users_result = pd.DataFrame(data=self.users, columns=cols)

        # self.cursor = connection.cursor()
        # self.strSql = "SELECT user_id as user_no FROM user where favorite_novel_genre IS NOT NULL and favorite_webtoon_genre IS NOT NULL"
        # self.cursor.execute(self.strSql)
        # self.users = self.cursor.fetchall()
        # cols = [column[0] for column in self.cursor.description]
        # self.users_result = pd.DataFrame(data=self.users, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT hit.user_no, book.genre_cd FROM hit " \
                      "join book on hit.book_no = book.book_no " \
                      "where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.hits = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.hits_results = pd.DataFrame(data=self.hits, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT score.user_no, book.genre_cd FROM score " \
                      "join book on score.book_no = book.book_no " \
                      "where score.score >= 8 and book.type_cd="+str(type_cd)

        self.cursor.execute(self.strSql)
        self.scores = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.scores_result = pd.DataFrame(data=self.scores, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT  book_mark.user_no, book.genre_cd  FROM book_mark " \
                      "join book on book_mark.book_no = book.book_no " \
                      "where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.bookmarks = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.bookmarks_result = pd.DataFrame(self.bookmarks, columns=cols)

        self.cursor = connection.cursor()
        self.strSql = "SELECT read_book.user_no, book.genre_cd  FROM read_book " \
                      "join book on read_book.book_no = book.book_no " \
                      "where book.type_cd="+str(type_cd)
        self.cursor.execute(self.strSql)
        self.reads = self.cursor.fetchall()
        cols = [column[0] for column in self.cursor.description]
        self.reads_result = pd.DataFrame(self.reads, columns=cols)

        connection.commit()
        connection.close()

    def calcSimilarity(self):

        # 조회, 북마크, 읽음 처리 기반으로 유사성 검사
        self.reads_result['values'] = 2
        self.hits_results['values'] = 1
        self.bookmarks_result['values'] = 1
        self.scores_result['score'] = 1

        users_books = pd.merge(
            self.users_result, self.bookmarks_result, how='outer', on="user_no"
        )

        users_books = pd.merge(
            users_books, self.hits_results, how='outer', on=["user_no", "genre_cd"]
        )

        users_books = pd.merge(
            users_books, self.scores_result, how='outer', on=["user_no", "genre_cd"]
        )

        users_books = pd.merge(
            users_books, self.reads_result, how='outer', on=["user_no", "genre_cd"]
        )

        # print(users_books)

        # Create pivot table with age and gender
        pivot_table = pd.pivot_table(
            users_books,
            index=['user_no'],
            columns=['genre_cd'],
            values=['values_x', 'values_y', 'score', 'values'],
            aggfunc=sum,
        )

        # print("/*******pivot_table*****")
        # print(pivot_table)
        #
        # print("/*******result*****")
        result = pivot_table.groupby(['genre_cd'], axis=1).mean()
        result.fillna(0, inplace=True)
        # print(result)

        user_based_book={}
        for index, row in result.iterrows():
            # 높은 점수의 3개 구하기
            top_genres = row.nlargest(3).index.tolist()
            print(f"For user {index}, top 3 genres: {top_genres}")
            user_based_book[index] = top_genres

        return user_based_book


    def save(self):
        user_based_book = self.calcSimilarity()

        for user, book_list in user_based_book.items():
            book_str=""
            for book_no in book_list:
                book_str += str(book_no)[:-2] + "^"

            if self.type_cd == 0:
                User.objects.filter(user_id=user).update(favorite_webtoon_genre=book_str)
            else:
                User.objects.filter(user_id=user).update(favorite_novel_genre=book_str)

        # print(user_based_book)


def execute_algorithm(type_cd):
    favoriteGenre(type_cd).save()
    print("---------------------------------------------------")


if __name__ == "__main__":
    execute_algorithm()