from django.urls import path
from organizers.views import auth as views

urlpatterns = [
    path("cadastro/", views.signUp, name="signUp"),
    path("login/", views.signIn, name="signIn"),
    path("sair/", views.signOut, name="signOut")
]
