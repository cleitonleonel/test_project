from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, "blank_page.html", {'base_page': 'base_page.html'})


def login(request):
    return render(request, "core/authentication/base_authentication.html", {'base_page': 'core/authentication/login.html'})

def signin(request):
    return render(request, "core/authentication/signin.html", {'base_page': 'core/authentication/base_authentication.html'})

