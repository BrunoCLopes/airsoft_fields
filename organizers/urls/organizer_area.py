from django.urls import path

from .. import views

urlpatterns = [
    path("painel/", views.organizer_area, name="panel"),
]
