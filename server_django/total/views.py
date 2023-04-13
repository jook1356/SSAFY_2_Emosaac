from time import sleep

from django.shortcuts import render
from rest_framework.decorators import api_view
from total import favoriteGenre, totalBookByAgeAndGender
from rest_framework.response import Response


def index(request):

    return render(request, 'totalGenres')

@api_view(['GET'])
def favorite_genre(request):
    print("--------------------------web")
    favoriteGenre.execute_algorithm(0)
    sleep(1)
    print("--------------------------nov")
    favoriteGenre.execute_algorithm(1)

    data = {
        "userId": "none",
        "webtoon": "none",
        "novel": "none"
    }
    return Response(data)

@api_view(['GET'])
def total_book_by_age_and_genre(request):

    resWebtoon = totalBookByAgeAndGender.execute_algorithm(0)
    resNovel = totalBookByAgeAndGender.execute_algorithm(1)

    data = {
        "userId": "none",
        "webtoon": resWebtoon,
        "novel": resNovel
    }
    return Response(data)