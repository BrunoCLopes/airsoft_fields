from django.shortcuts import render, redirect
from .models import Organizer
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.core.validators import validate_email

# Create your views here.
def signUp(request):
    if request.method == 'GET':
        return render(request, 'organizers/auth/signUp.html')
    else:
        username = request.POST.get('signUp-username')
        email = request.POST.get('signUp-email')
        password = request.POST.get('signUp-password')
        confirmPassword = request.POST.get('signUp-confirm-password')

        if password != confirmPassword: return render(request, 'organizers/auth/signUp.html', {'passwordMismatch':'As senhas não coincidem.'})

        try:
            validate_email(email)
            
            user = Organizer.objects.create_user(username=username, email=email, password=password)
            user.is_active = False
            user.save()

            return redirect('index')

        except Exception:
            return redirect('index')

def signIn(request):
    if request.method == "GET":
        return render(request, 'organizers/auth/signIn.html')
    else:
        try:
            email = request.POST.get('signIn-email')
            password = request.POST.get('signIn-password')

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
    return render(request, 'organizers/organizer_area/new_field.html')

@login_required()
def my_profile(request):
    return render(request, 'organizers/organizer_area/my_profile.html')