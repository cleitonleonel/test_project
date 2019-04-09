from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, "blank_page.html", {'base_page': 'base_page.html'})


def login(request):
    return render(request, "core/authentication/new_login.html", {'base_page': 'core/authentication/new_base_auth.html'})


def signup(request):
    return render(request, "core/authentication/signin.html", {'base_page': 'core/authentication/new_base_auth.html'})

