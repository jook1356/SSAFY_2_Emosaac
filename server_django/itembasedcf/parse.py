import pandas as pd
from datetime import datetime

import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from django.db import connection
import operator
import warnings
from scipy.sparse import hstack

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from itembasedcf.models import ItemBasedcfmodel, Book

from django.db import connection

def book_list_view():
    try:
        cursor = connection.cursor()
        strSql = "SELECT book_no, title, tag, story  FROM book where type_cd = 1"
        cursor.execute(strSql)
        books = cursor.fetchall()
        result = pd.DataFrame(books,  columns = ['book_id', 'title', 'tag', 'story'])

        connection.commit()
        connection.close()

    except Book.DoseNotExist:
        connection.rollback()


    return result


def get_recommendations(idx):
    book_list = book_list_view()

    vect = CountVectorizer()  # Counter Vectorizer 객체 생성
    countvect = vect.fit_transform(book_list['tag'])  # 작품수 X 테그수수

    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(book_list['story'])

    vector = hstack([tfidf_matrix, countvect])

    cosine_sim = cosine_similarity(vector, vector)

    # 해당 작품과 모든 작품과의 유사도를 가져온다.
    sim_scores = list(enumerate(cosine_sim[idx]))

    # 유사도에 따라 작품들을 정렬한다.
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 가장 유사한 30개의 작품을 받아온다.
    sim_scores = sim_scores[1:31]

    # 가장 유사한 30개의 작품의 인덱스를 얻는다.
    movie_indices = [idx[0] for idx in sim_scores]

    # 가장 유사한 10개의 영화의 제목을 리턴한다.
    return book_list['title'].iloc[movie_indices]

def item_based_cf(book_no):
    result = get_recommendations(book_no-1).index
    li = []
    res = ""
    for i in range(30):
        li.append(result[i] + 1)
    for i in li:
        res += str(i) + " "
    # print(res)
    return res

def save(book_no):
    item_based_book = item_based_cf(book_no)
    # try:
    # book =  Book.objects.get(book_no = book_no)
    # except Book.DoesNotExist:
    #     return
    ItemBasedcfmodel(
        book_no = Book.objects.get(book_no = book_no),
        book_no_list = item_based_book,
        type_cd = 1
    ).save()

