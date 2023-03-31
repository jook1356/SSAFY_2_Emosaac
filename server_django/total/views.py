from django.shortcuts import render
from rest_framework.decorators import api_view
from total import favoriteGenre, totalBookByAgeAndGender
from rest_framework.response import Response


def index(request):
    # print("--------------------------web")
    # favoriteGenre.execute_algorithm(0)
    # print("--------------------------nov")
    # favoriteGenre.execute_algorithm(1)
    return render(request, 'totalGenres')

@api_view(['GET'])
def favorite_genre(request):
    print("--------------------------web")
    favoriteGenre.execute_algorithm(0)
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

    print("--------------------------tmp")
    resWebtoon = totalBookByAgeAndGender.execute_algorithm(0)
    print("--------------------------resweb")
    resNovel = totalBookByAgeAndGender.execute_algorithm(1)

    data = {
        "userId": "none",
        "webtoon": resWebtoon,
        "novel": resNovel
    }
    return Response(data)