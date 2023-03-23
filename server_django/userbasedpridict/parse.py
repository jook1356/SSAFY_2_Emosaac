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