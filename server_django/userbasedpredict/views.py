from django.shortcuts import render

# Create your views here.
from userbasedpredict import ScorePredict, RequestPredictByNewUser
from recommand.models import UserPredictedGradeModel

def index(request):
    UserPredictedGradeModel.objects.all().delete()
    ScorePredict.execute_algorithm(0)
    ScorePredict.execute_algorithm(1)
    # RequestPredictByNewUser.execute_algorithm(2, 1) # user_id, type_cd : 유저 회원가입 시 사용하는 페이지

    return render(request, 'userbasedpredict')

# 요청(회원 가입시)
# class MyAPIView(APIView):
#
#     def get(self, request, user_id, format=None):
#
#         resWebtoon = RequestToonPredictByNewUser.execute_algorithm(user_id)
#         # resNovel = RequestNovelPredictByNewUser.execute_algorithm(user_id)
#
#         data = {
#             "userId": user_id,
#             "webtoon": resWebtoon,
#             # "novel": resNovel
#         }
#
#         return Response(data)