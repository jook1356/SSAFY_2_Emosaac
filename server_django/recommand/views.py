from django.shortcuts import render

# # Create your views here.
# # Create your views here.
# from django.http import HttpResponse
#
#
# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")


from django.http import HttpResponse
from rest_framework.views import APIView
from recommand.models import User
from recommand.generate import UpdateUserBasedCF, UpdateUserPredictedGrade
from django.shortcuts import get_object_or_404

from django.shortcuts import render

def index(request):
    return render(request, 'hi')

class UpdateUserRecommList(APIView):
    def get_object(self, user_email):
        return get_object_or_404(User, pk=user_email)

    def get(self, request, user_email, format=None):
        user_nickname = User.objects.get(user_email=user_email).user_nickname

        print("--- Update User Based CF ---")
        UpdateUserBasedCF(user_email).save_list()
        print("--- Update User Predicted Grade ---")
        UpdateUserPredictedGrade(user_email).save_list()

        return HttpResponse(user_nickname)