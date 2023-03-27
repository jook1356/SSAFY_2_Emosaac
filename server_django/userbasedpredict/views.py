from django.shortcuts import render

# Create your views here.
from userbasedpredict.parse import BookListView, ScoreListView, ReadBookListView, svdModel
from userbasedpredict import ScorePredict

def index(request):
    # BookListView()
    # ReadBookListView()
    # ScoreListView()

    # svdModel() # surprise

    ScorePredict.execute_algorithm()

    return render(request, 'userbasedpredict')