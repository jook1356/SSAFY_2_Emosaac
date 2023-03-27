from django.shortcuts import render
from itembasedcf.parse import save
# Create your views here.
def index(request):
    for i in range(3087, 6531):
        save(i)
