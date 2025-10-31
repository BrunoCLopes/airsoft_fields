from django.shortcuts import render, redirect
from django.contrib import messages
from fields.models import Field, FieldPhoto
from django.contrib.auth.decorators import login_required
from organizers.validators import validate_state, validate_city
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
