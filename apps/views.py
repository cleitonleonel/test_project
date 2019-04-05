from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, "blank_page.html", {'base_page': 'base_page.html'})


def login(request):
    return render(request, "core/authentication/login.html", {'base_page': 'core/authentication/base_login.html'})
