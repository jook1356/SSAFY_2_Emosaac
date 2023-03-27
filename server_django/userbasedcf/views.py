from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from userbasedcf import recommandNovel, recommandWebtoon, recommandNovelByAgeAndGender_notuse, \
    recommandWebtoonByAgeAndGender_notuse, \
    totalWebtoonByAgeAndGender, recommandWebtoonRequest, recommandNovelRequest
from rest_framework.views import APIView
from rest_framework.response import Response


def index(request):
    # recommandNovel.execute_algorithm()
    # recommandWebtoon.execute_algorithm()

    recommandWebtoonRequest.execute_algorithm(2)

    # recommandNovelByAgeAndGender.execute_algorithm()
    # recommandWebtoonByAgeAndGender.execute_algorithm()
    # totalWebtoonByAgeAndGender.execute_algorithm()

    return render(request, 'hi')


# 요청(회원 가입시)
class MyAPIView(APIView):

    def get(self, request, user_id, format=None):

        resWebtoon = recommandWebtoonRequest.execute_algorithm(user_id)
        resNovel = recommandNovelRequest.execute_algorithm(user_id)

        data = {
            "userId": user_id,
            "webtoon": resWebtoon,
            "novel": resNovel
        }

        return Response(data)
