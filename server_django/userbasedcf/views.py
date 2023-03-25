from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from userbasedcf import recommandWebtoon, recommandNovel


def index(request):
    recommandWebtoon.execute_algorithm()
    recommandNovel.execute_algorithm()

    return render(request, 'hi')