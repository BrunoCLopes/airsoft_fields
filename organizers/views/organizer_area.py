from django.shortcuts import render, redirect
from django.contrib import messages
from fields.models import Field, FieldPhoto
from django.contrib.auth.decorators import login_required

@login_required()
def my_fields(request):
    userFields = Field.objects.filter(organizer=request.user)
    return render(request, "organizers/organizer_area/my_fields.html", {'userFields': userFields})

@login_required()
def new_field(request):
    if request.method == 'POST':
        try:
            field_name = request.POST.get('field-name')
            field_type = request.POST.get('field-type')
            address = request.POST.get('field-address')
            state = request.POST.get('field-state')
            city = request.POST.get('field-city')
            phone = request.POST.get('field-phone')
            description = request.POST.get('field-description')
            operating_hours = request.POST.get('field-hours')
            field_photo = request.FILES.get('field-photo')
            user = request.user

            new_field = Field.objects.create(
                field_name=field_name,
                field_type=field_type,
                address=address,
                state=state,
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
            messages.error(request, 'Erro ao criar o campo, tente novamente mais tarde.')
            return redirect('my_fields')

    return render(request, 'organizers/organizer_area/new_field.html')

@login_required()
def my_profile(request):
    return render(request, 'organizers/organizer_area/my_profile.html')
