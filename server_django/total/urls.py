from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),

    path('genre', views.favorite_genre),  # total genre
    path('ageAndGen', views.total_book_by_age_and_genre),  # total genre
]