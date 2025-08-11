from django.urls import path

from . import views

urlpatterns = [
    path("cadastro/", views.signUp, name="signUp"),
    path("login/", views.signIn, name="signIn"),
]
