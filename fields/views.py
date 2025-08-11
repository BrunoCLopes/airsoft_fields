from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, "fields/index.html")

def about(request):
    return render(request, "fields/about.html")

def airsoft(request):
    return render(request, "fields/airsoft.html")