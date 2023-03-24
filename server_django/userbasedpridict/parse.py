import pandas as pd
from datetime import datetime

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from django.db import connection
import operator
import warnings

warnings.filterwarnings(action='ignore')

import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

from recommand.models import UserPredictedGradeModel, User, Book, Score

from django.db import connection

# def BookListView():

# ratings_arr.dot(item_sim_arr) : 평점 * 책 유사도
# ratings_arr : 사용자 u의 아이템 i와 가장 유사도가 높은 Top_N개 아이템에 대한 실제 평점 벡터
# item_sim_arr : 아이템 i와 가장 유사도가 높은 Top_N개 아이템의 유사도 벡터

# 개인화된 예측 평점
# 평점 value와 유사도 value만 뽑아서 대입

# 개인별로 계산된 예측 평점
# ratings_pred_matrix