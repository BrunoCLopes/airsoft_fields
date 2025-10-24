from django.shortcuts import render, redirect
from django.contrib import messages
from organizers.models import Organizer
from fields.models import Field, FieldPhoto
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.validators import validate_email

# Create your views here.
def signUp(request):
    if request.method == 'GET':
        print(1)
        return render(request, 'organizers/auth/signUp.html')
    else:
        try:
            username = request.POST.get('signUp-username')
            email = request.POST.get('signUp-email')
            password = request.POST.get('signUp-password')
            confirmPassword = request.POST.get('signUp-confirm-password')

            if not all([username, email, password, confirmPassword]):  
                raise Exception 

            validate_email(email)
 
            if password != confirmPassword:
                raise Exception

            user = Organizer.objects.create_user(username=username, email=email, password=password)
            user.is_active = False
            user.save()

            messages.success(request, 'Sucesso! Aguarde a aprovação do seu cadastro por nossa equipe.')
            return redirect('index') 
        
        except Exception:
            messages.error(request, 'Erro ao criar a conta, tente novamente mais tarde.')
            return redirect('index')

def signIn(request):
    if request.method == "GET":
        return render(request, 'organizers/auth/signIn.html')
    else:
        try:
            email = request.POST.get('signIn-email')
            password = request.POST.get('signIn-password')

            if not all([email, password]):  
                raise Exception

            validate_email(email)

            organizer = authenticate(request, username=email, password=password)

            if organizer is not None:
                login(request, organizer)
                return redirect('my_fields')
            else:
                return render(request, 'organizers/auth/signIn.html', {'userNotFound':'E-mail ou senha incorretos.'})
            
        except Exception:
            messages.error(request, 'Erro ao fazer login, tente novamente mais tarde.')
            return redirect('index') 

@login_required()
def my_fields(request):
    return render(request, "organizers/organizer_area/my_fields.html")

@login_required()
def new_field(request):
    if request.method == 'GET':
        return render(request, 'organizers/organizer_area/new_field.html')
    else:
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

            if not all([field_name, field_type, address, state, city, phone, description, operating_hours, user, field_photo]):  
                raise Exception 

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
            return redirect('new_field')

@login_required()
def my_profile(request):
    return render(request, 'organizers/organizer_area/my_profile.html')