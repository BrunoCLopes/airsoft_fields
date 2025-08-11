from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("sobre/", views.about, name="about"),
    path("airsoft/", views.airsoft, name="airsoft"),
]