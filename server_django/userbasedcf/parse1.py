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

from recommand.models import User, UserPredictedGradeModel
# from book.models import Book
from recommand.models import Book


from django.db import connection

def UserSave():
    #save test
    User(
        email = "dfsd",
        user_name = "dsfsdf",
        created_dt = datetime.now(),
        modified_dt = datetime.now()
    ).save()


def UserListView():
    #user select test
    try:
        cursor = connection.cursor()
        strSql = "SELECT user_no , email, user_name FROM user"
        cursor.execute(strSql)
        books = cursor.fetchall()
        result = pd.DataFrame(books)

        connection.commit()
        connection.close()

        print(f"users {result}")

    except:
        connection.rollback()




def execute_algorithm():
    return



if __name__ == "__main__":
    execute_algorithm()