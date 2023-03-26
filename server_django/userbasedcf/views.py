from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from userbasedcf import recommandNovel, recommandWebtoon, recommandNovelByAgeAndGender, recommandWebtoonByAgeAndGender, \
    totalWebtoonByAgeAndGender


def index(request):
    # recommandNovel.execute_algorithm()
    # recommandWebtoon.execute_algorithm()
    # recommandNovelByAgeAndGender.execute_algorithm()
    # recommandWebtoonByAgeAndGender.execute_algorithm()
    totalWebtoonByAgeAndGender.execute_algorithm()

    return render(request, 'hi')