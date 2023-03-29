from django.shortcuts import render
from rest_framework.views import APIView
from totalgenre import favoriteGenre
from rest_framework.response import Response


# Create your views here.
def index(request):
    # print("--------------------------web")
    # favoriteGenre.execute_algorithm(0)
    # print("--------------------------nov")
    # favoriteGenre.execute_algorithm(1)
    return render(request, 'totalGenres')

class MyAPIView(APIView):

    def get(self, request, format=None):

        print("--------------------------web")
        favoriteGenre.execute_algorithm(0)
        print("--------------------------nov")
        favoriteGenre.execute_algorithm(1)

        data = {
            "success": "success"
        }

        return Response(data)