from django.shortcuts import render

# Create your views here.
def signUp(request):
    return render(request, 'organizers/signUp.html')

def signIn(request):
    return render(request, 'organizers/signIn.html')