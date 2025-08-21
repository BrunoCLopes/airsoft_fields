from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Organizer
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

# Create your views here.
def signUp(request):
    if request.method == 'GET':
        return render(request, 'organizers/auth/signUp.html')
    else:
        username = request.POST.get('signUp-username')
        email = request.POST.get('signUp-email')
        password = request.POST.get('signUp-password')
        first_name = request.POST.get('signUp-first-name')

        try:
            user = Organizer.objects.create_user(username=username, first_name=first_name, email=email, password=password)
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
            username = request.POST.get('signIn-username')
            password = request.POST.get('signIn-password')

            organizer = authenticate(request, username=username, password=password)
            if organizer is not None:
                login(request, organizer)
                return redirect('my_fields')
            else:
                return render(request, 'organizers/auth/signIn.html', {'user_not_found':'Nome de usuário ou senha incorretos.'})
        except Exception:
            messages.error(request, 'Erro ao fazer login, tente novamente mais tarde.')
            return redirect('index')

@login_required()
def my_fields(request):
    return render(request, "organizers/organizer_area/my_fields.html")

@login_required()
def new_field(request):
    return render(request, 'organizers/organizer_area/new_field.html')

@login_required()
def my_profile(request):
    return render(request, 'organizers/organizer_area/my_profile.html')