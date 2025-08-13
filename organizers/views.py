from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Organizer
# Create your views here.
def signUp(request):
    if request.method == 'GET':
        return render(request, 'organizers/signUp.html')
    else:
        username = request.POST.get('signUp-username')
        email = request.POST.get('signUp-email')
        password = request.POST.get('signUp-password')

        try:
            if not username:
                messages.error(request, 'Campo é obrigatório.')
                return redirect('signUp')
            
            if not email:
                messages.error(request, 'Campo é obrigatório.')
                return redirect('signUp')
            
            if not password:
                messages.error(request, 'Campo é obrigatório.')
                return redirect('signUp')
        except:
            return

        Organizer.objects.create_user(username, email, password)
        messages.success(request, 'Sucesso! Aguarde a aprovação do seu cadastro por nossa equipe.')
        return redirect('index')

def signIn(request):
    return render(request, 'organizers/signIn.html')