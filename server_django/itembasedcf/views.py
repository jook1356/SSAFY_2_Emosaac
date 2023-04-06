from django.shortcuts import render
from itembasedcf.parse import save
# Create your views here.
def index(request):
    for i in range(9260, 19171):
        # print(i, ": ", end='')
        save(i)
