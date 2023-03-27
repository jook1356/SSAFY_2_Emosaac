from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from userbasedcf import recommandBook, totalBookByAgeAndGender, totalBookByAgeAndGender, recommandBookRequest
from rest_framework.views import APIView
from rest_framework.response import Response

# 요청(회원 가입시)
class MyAPIView(APIView):

    def get(self, request, user_id, format=None):

        # totalBookByAgeAndGender.execute_algorithm(0)
        # totalBookByAgeAndGender.execute_algorithm(1)

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
