# 배치로 선호 장르 반영하기!!
import pandas as pd
from django.db import connection

from userbasedcf.models import User, Hit, Score, ReadBook, BookMark


class favoriteGenre():
    def __init__(self, type_cd):

        self.type_cd = type_cd
        self.type_cd = type_cd

        self.users_result = pd.DataFrame.from_records(
            User.objects.values_list("user_id"),
            columns=["user_no"]
        )

        self.hits_result = pd.DataFrame.from_records(
            Hit.objects.filter(book_no__type_cd=type_cd).values_list(
                "user_no", "book_no__genre_cd"
            ),
            columns=["user_no", "genre_cd"]

        )

        self.scores_result = pd.DataFrame.from_records(
            Score.objects.filter(score__gte=7, book_no__type_cd=type_cd).values_list(
                "user_no", "book_no__genre_cd"
            ),
            columns=["user_no", "genre_cd"]

        )

        self.bookmarks_result = pd.DataFrame.from_records(
            BookMark.objects.filter(book_no__type_cd=type_cd).values_list(
                "user_no", "book_no__genre_cd"
            ),
            columns=["user_no", "genre_cd"]

        )

        self.reads_result = pd.DataFrame.from_records(
            ReadBook.objects.filter(book_no__type_cd=self.type_cd).values_list(
                "user_no", "book_no__genre_cd"
            ),
            columns=["user_no", "genre_cd"]

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
            index=['user_no'],
            columns=['genre_cd'],
            values=['read_values', 'hit_values', 'bookmark_values', 'score_values'],
            aggfunc=sum,
        )


        result = pivot_table.groupby(['genre_cd'], axis=1).mean()
        result.fillna(0, inplace=True)

        user_based_book = {}
        for index, row in result.iterrows():
            # 높은 점수의 3개 구하기
            top_genres = row.nlargest(3).index.tolist()
            print(f"For user {index}, top 3 genres: {top_genres}")
            user_based_book[index] = top_genres

        return user_based_book

    def save(self):
        user_based_book = self.calcSimilarity()

        for user, book_list in user_based_book.items():
            book_str = ""
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
