from django.shortcuts import render
from rest_framework.views import APIView
from total import favoriteGenre, totalBookByAgeAndGender
from rest_framework.response import Response


def index(request):
    # print("--------------------------web")
    # favoriteGenre.execute_algorithm(0)
    # print("--------------------------nov")
    # favoriteGenre.execute_algorithm(1)
    return render(request, 'totalGenres')

class MyAPIViewGenre(APIView):

    def get(self, request, format=None):
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

class MyAPIViewAgeAndGenre(APIView):

    def get(self, request, format=None):

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