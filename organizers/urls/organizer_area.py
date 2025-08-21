from django.urls import path

from .. import views

urlpatterns = [
    path("meus_campos/", views.my_fields, name="my_fields"),
    path("novo_campo/", views.new_field, name="new_field"),
    path("meu_perfil/", views.my_profile, name="my_profile"),
]
