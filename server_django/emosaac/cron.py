# from crontab import CronTab
# import os
# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")
#
# cron = CronTab(user=True)
#
# job = cron.new(command='python userbasedcf/recommandBook.py')
# job.setall('*/1 * * * *')
# cron.write()
# .cron.py
from userbasedcf import recommandBook, totalBookByAgeAndGender
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "emosaac.settings")

import django

django.setup()

def crontab_job():

    recommandBook.execute_algorithm(0)
    recommandBook.execute_algorithm(1)

    totalBookByAgeAndGender.execute_algorithm(0)
    totalBookByAgeAndGender.execute_algorithm(1)