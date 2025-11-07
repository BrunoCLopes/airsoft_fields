from django.urls import path

from organizers.views import organizer_area as views

urlpatterns = [
    path("meus_campos/", views.my_fields, name="my_fields"),
    path("novo_campo/", views.new_field, name="new_field"),
    path("meu_perfil/", views.my_profile, name="my_profile"),
    path("excluir_campo/", views.delete_field, name="delete_field"),
    path("editar_campo/", views.edit_field, name="edit_field"),
    path("atualizar_info_usuario/", views.info_user_update, name="info_user_update"),
    path("atualizar_senha_usuario/", views.security_user_update, name="security_user_update"),
    path("deletar_conta/", views.delete_user, name="delete_user"),
]
