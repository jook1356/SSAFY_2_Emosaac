from django.shortcuts import render

# Create your views here.
from userbasedpredict.parse import BookListView, ScoreListView, ReadBookListView, svdModel
from userbasedpredict import ScorePredict, RequestToonPredictByNewUser, RequestNovelPredictByNewUser

def index(request):
    # BookListView()
    # ReadBookListView()
    # ScoreListView()

    # svdModel() # surprise
###################################################
    # ScorePredict.execute_algorithm()
    RequestToonPredictByNewUser.execute_algorithm(3)

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