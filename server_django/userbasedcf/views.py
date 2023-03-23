from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from userbasedcf.parse import UserListView, UserSave


def index(request):
    UserListView()
    UserSave()
    return render(request, 'hi')