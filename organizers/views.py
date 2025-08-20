from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Organizer
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

# Create your views here.
def signUp(request):
    if request.method == 'GET':
        return render(request, 'organizers/signUp.html')
    else:
        username = request.POST.get('signUp-username')
        email = request.POST.get('signUp-email')
        password = request.POST.get('signUp-password')

        try:
            errors = {}

            if not username:
                errors['required_username'] = 'Nome de usuário é obrigatório.'
            
            if not email:
                errors['required_email'] = 'E-mail é obrigatório.'
            
            if not password:
                errors['required_password'] = 'Senha é obrigatória.'

            if errors != {}:
                return render(request, 'organizers/signUp.html', {
                    'errors' : errors,
                    'username' : username,
                    'email' : email
                    })
            Organizer.objects.create_user(username=username, email=email, password=password)

            messages.success(request, 'Sucesso! Aguarde a aprovação do seu cadastro por nossa equipe.')
            return redirect('index')
        
        except Exception:
            messages.error(request, 'Erro ao criar a conta.')
            return redirect('index')

def signIn(request):
    if request.method == "GET":
        return render(request, 'organizers/signIn.html')
    else:
        try:
            errors = {}
            username = request.POST.get('signIn-username')
            password = request.POST.get('signIn-password')

            if not username:
                errors['required_username'] = 'Nome de usuário é obrigatório.'
            if not password:
                errors['required_password'] = 'Senha é obrigatória.'

            if errors != {}:
                return render(request, 'organizers/signIn.html', {
                    'errors' : errors,
                    'username' : username,
                    })

            organizer = authenticate(request, username=username, password=password)
            if organizer is not None:
                login(request, organizer)
                return redirect('index')
            else:
                return redirect('signIn')
        except Exception:
            messages.error(request, 'Erro ao fazer login.')
            return redirect('index')

@login_required()
def organizer_area(request):
    return render(request, "organizers/organizer_area.html")