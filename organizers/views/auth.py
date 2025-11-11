from django.shortcuts import render, redirect
from django.contrib import messages
from organizers.models import Organizer
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

def signUp(request):
    if request.method == 'POST':
        try:
            username = request.POST.get('signUp-username').strip()
            email = request.POST.get('signUp-email').strip()
            password = request.POST.get('signUp-password')
            confirmPassword = request.POST.get('signUp-confirm-password')
 
            if Organizer.objects.filter(email=email).exists():
                return render(request, 'organizers/auth/signUp.html', {'emailAlreadyExists': 'Este e-mail já está cadastrado.'})

            if password == confirmPassword:
                user = Organizer.objects.create_user(username=username, email=email, password=password)
                user.is_active = False
                user.save()
            else:
                raise Exception()

            messages.success(request, 'Sucesso! Aguarde a aprovação do seu cadastro por nossa equipe.')
            return redirect('index') 
        
        except Exception:
            messages.error(request, 'Erro ao criar a conta, tente novamente mais tarde.')
            return redirect('index')

    return render(request, 'organizers/auth/signUp.html')

def signIn(request):
    if request.method == "POST":
        try:
            email = request.POST.get('signIn-email').strip()
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

    return render(request, 'organizers/auth/signIn.html')

@login_required()
def signOut(request):
    logout(request)
    messages.success(request, 'Você saiu com sucesso!')
    return redirect('index')
