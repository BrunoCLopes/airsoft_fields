from django.shortcuts import render, redirect
from django.contrib import messages
from urllib3 import request
from fields.models import Field, FieldPhoto
from django.contrib.auth.decorators import login_required
from organizers.validators import validate_state, validate_city
from django.contrib.auth import update_session_auth_hash
import os

@login_required()
def my_fields(request):
    user_fields = Field.objects.filter(organizer=request.user)
    return render(request, "organizers/organizer_area/my_fields.html", {'user_fields': user_fields})

@login_required()
def new_field(request):
    if request.method == 'POST':
        try:
            field_name = request.POST.get('field-name')
            field_type = request.POST.get('field-type')
            address = request.POST.get('field-address')
            state = request.POST.get('field-state')
            state_abbreviation = request.POST.get('state-abbreviation')
            city = request.POST.get('field-city')
            phone = request.POST.get('field-phone')
            description = request.POST.get('field-description')
            operating_hours = request.POST.get('field-hours')
            field_photo = request.FILES.get('field-photo')
            user = request.user

            if not field_photo:
                raise Exception()

            if not validate_state(state, state_abbreviation):
                raise Exception()
            
            if not validate_city(state_abbreviation, city):
                raise Exception()

            new_field = Field.objects.create(
                field_name=field_name,
                field_type=field_type,
                address=address,
                state=state,
                state_abbreviation=state_abbreviation,
                city=city,
                phone=phone,
                description=description,
                operating_hours=operating_hours,
                organizer=user
            )
            
            field_photo = FieldPhoto.objects.create(
                field=new_field,
                photo=field_photo
            )

            messages.success(request, 'Campo criado com sucesso!')
            return redirect('my_fields') 
        
        except Exception:
            messages.error(request, f'Erro ao criar o campo, tente novamente mais tarde.')
            return redirect('my_fields')
    return render(request, 'organizers/organizer_area/new_field.html')

@login_required()
def edit_field(request):
    if request.method == 'POST':
        try:
            field_id = request.POST.get('field-id-to-edit')
            field = Field.objects.get(id=field_id, organizer=request.user)

            edit_visible = request.POST.get('edit-field-status') == 'True'

            updates = {
                'field_name': request.POST.get('edit-field-name'),
                'field_type': request.POST.get('edit-field-type'),
                'phone': request.POST.get('edit-field-phone'),
                'description': request.POST.get('edit-field-description'),
                'operating_hours': request.POST.get('edit-field-hours'),
                'visible': edit_visible,
            }

            edit_field_photo = request.FILES.get('edit-field-photo')
    
            has_text_changes = any(
                getattr(field, key) != value 
                for key, value in updates.items()
            )

            has_photo_change = edit_field_photo is not None

            if not has_text_changes and not has_photo_change:
                messages.info(request, 'Nenhuma alteração foi feita no campo.')
                return redirect('my_fields')

            for key, value in updates.items():
                setattr(field, key, value)

            field.save()

            if has_photo_change:
                old_field_photo = FieldPhoto.objects.filter(field=field).first()
                if old_field_photo and old_field_photo.photo:
                    if os.path.isfile(old_field_photo.photo.path):
                        os.remove(old_field_photo.photo.path)
        
                FieldPhoto.objects.filter(field=field).delete()
                
                FieldPhoto.objects.create(
                    field=field,
                    photo=edit_field_photo
                )

            messages.success(request, f'O campo {field} foi atualizado com sucesso.')
            return redirect('my_fields')
        
        except Exception:
            messages.error(request, 'Erro ao editar o campo, tente novamente mais tarde.')
            return redirect('my_fields')
    
@login_required()
def delete_field(request):
    if request.method == 'POST':
        try:
            field_id = request.POST.get('field-id-to-delete')
            field = Field.objects.get(id=field_id, organizer=request.user)

            field_photo = FieldPhoto.objects.filter(field=field).first()
            if field_photo and field_photo.photo:
                if os.path.isfile(field_photo.photo.path):
                    os.remove(field_photo.photo.path)

            field.delete()
            messages.success(request, f'O campo {field} foi excluído com sucesso.')
            return redirect('my_fields')
        except Exception:
            messages.error(request, 'Erro ao excluir o campo, tente novamente mais tarde.')
            return redirect('my_fields')

@login_required()
def my_profile(request):
    return render(request, 'organizers/organizer_area/my_profile.html')

@login_required()
def info_user_update(request):
    if request.method == 'POST':
        try:
            user = request.user
            old_profile_photo = user.profile_photo

            updates = {
                'username': request.POST.get('username'),
                'email': request.POST.get('user-email'),
                'phone': request.POST.get('user-phone'),
            }

            update_profile_photo = request.FILES.get('profile-photo')
            remove_requested = (request.POST.get('default-photo') == 'true')

            has_photo_change = update_profile_photo is not None or remove_requested

            has_text_changes = any(
                getattr(user, key) != value
                for key, value in updates.items()
            )

            if not has_text_changes and not has_photo_change:
                messages.info(request, 'Nenhuma alteração no seu perfil foi feita.')
                return redirect('my_profile')
            
            for key, value in updates.items():
                setattr(user, key, value)

            if has_photo_change:
                if old_profile_photo and os.path.isfile(old_profile_photo.path):
                    os.remove(old_profile_photo.path)

                user.profile_photo = update_profile_photo
            elif remove_requested:
                if old_profile_photo and os.path.isfile(old_profile_photo.path):
                    os.remove(old_profile_photo.path)

            user.save()

            messages.success(request, 'Perfil atualizado com sucesso!')
            return redirect('my_profile')
        except Exception:
            messages.error(request, 'Erro ao atualizar o perfil, tente novamente mais tarde.')
            return redirect('my_profile')

@login_required()
def security_user_update(request):
    if request.method == 'POST':
        try:
            user = request.user
            old_password = request.POST.get('old-password')
            new_password = request.POST.get('new-password')
            confirm_new_password = request.POST.get('confirm-new-password')

            if not user.check_password(old_password):
                messages.error(request, 'Senha atual incorreta.')
                return redirect('my_profile')

            if new_password != confirm_new_password:
                raise Exception()
            
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)

            messages.success(request, 'Senha atualizada com sucesso!')
            return redirect('my_profile')
        except Exception:
            messages.error(request, 'Erro ao atualizar a senha, tente novamente mais tarde.')
            return redirect('my_profile')
        
@login_required()
def delete_user(request):
    if request.method == 'POST':
        try:
            user = request.user

            if user.profile_photo and os.path.isfile(user.profile_photo.path):
                os.remove(user.profile_photo.path)

            user_fields = Field.objects.filter(organizer=user)
            for field in user_fields:
                field_photos = FieldPhoto.objects.filter(field=field).first()

                if field_photos.photo and os.path.isfile(field_photos.photo.path):
                    os.remove(field_photos.photo.path)

            user.delete()
            messages.success(request, 'Sua conta foi deletada com sucesso.')
            return redirect('index')
        except Exception:
            messages.error(request, 'Erro ao deletar a conta, tente novamente mais tarde.')
            return redirect('my_profile')