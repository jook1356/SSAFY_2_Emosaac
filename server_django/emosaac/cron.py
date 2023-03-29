from userbasedcf import recommandBook, totalBookByAgeAndGender
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

def crontab_job_cf():

    recommandBook.execute_algorithm(0)
    recommandBook.execute_algorithm(1)


def crontab_job_age_gen():

    totalBookByAgeAndGender.execute_algorithm(0)
    totalBookByAgeAndGender.execute_algorithm(1)

def crontab_job_predict():

    UserPredictedGradeModel.objects.all().delete()
    ScorePredict.execute_algorithm(0)
    ScorePredict.execute_algorithm(1)

def test1():
   print(11)
