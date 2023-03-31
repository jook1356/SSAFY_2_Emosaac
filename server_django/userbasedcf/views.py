# Create your views here.
from django.shortcuts import render
from rest_framework.decorators import api_view
from userbasedcf import recommandBook, recommandBookRequest
from rest_framework.response import Response

# 요청(회원 가입시)
@api_view(['GET'])
def new_user_cf(request, user_id):
    res_webtoon = recommandBookRequest.execute_algorithm(user_id, 0)
    res_novel = recommandBookRequest.execute_algorithm(user_id, 1)

    data = {
        "userId": user_id,
        "webtoon": res_webtoon,
        "novel": res_novel
    }

    return Response(data)

@api_view(['GET'])
def schedule_cf(request):
    res_webtoon = recommandBook.execute_algorithm(0)
    res_novel = recommandBook.execute_algorithm(1)

    data = {
        "userId": "none",
        "webtoon": res_webtoon,
        "novel": res_novel
    }

    return Response(data)



def index(request):
    # print("--------------------------web")
    # recommandBook.execute_algorithm(0)
    # print("--------------------------nov")
    # recommandBook.execute_algorithm(1)
    return render(request, 'userbasecf')