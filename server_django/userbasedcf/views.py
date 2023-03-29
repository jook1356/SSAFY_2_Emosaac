# Create your views here.
from django.shortcuts import render

from userbasedcf import recommandBook, recommandBookRequest
from total import totalBookByAgeAndGender
from rest_framework.views import APIView
from rest_framework.response import Response

# 요청(회원 가입시)
class MyAPIViewNewUserCf(APIView):

    def get(self, request, user_id, format=None):

        print("--------------------------tmp")
        print(user_id)
        resWebtoon = recommandBookRequest.execute_algorithm(user_id, 0)
        print("--------------------------resweb")
        resNovel = recommandBookRequest.execute_algorithm(user_id, 1)

        data = {
            "userId": user_id,
            "webtoon": resWebtoon,
            "novel": resNovel
        }

        return Response(data)

class MyAPIViewCf(APIView):

    def get(self, request,format=None):

        print("--------------------------tmp")
        resWebtoon = recommandBook.execute_algorithm(0)
        print("--------------------------resweb")
        resNovel = recommandBook.execute_algorithm(1)

        data = {
            "userId": "none",
            "webtoon": resWebtoon,
            "novel": resNovel
        }

        return Response(data)



def index(request):
    # print("--------------------------web")
    # recommandBook.execute_algorithm(0)
    # print("--------------------------nov")
    # recommandBook.execute_algorithm(1)
    return render(request, 'userbasecf')