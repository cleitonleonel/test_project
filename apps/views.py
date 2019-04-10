from django.contrib.auth import logout
from django.shortcuts import render, redirect

from apps.project.management.actions.validators import check_islogged


def index(request):
    return render(request, "blank_page.html", {'base_page': 'base_page.html'})


def login(request):
    return render(request, "core/authentication/login.html",
                  {'base_page': 'core/authentication/base_authentication.html'})


def signup(request):
    return render(request, "core/authentication/signup.html",
                  {'base_page': 'core/authentication/base_authentication.html'})


def logout_page(request):
    if check_islogged(request):
        logout(request)
        return redirect("/login")
    else:
        return render(request, "core/authentication/logout_error.html",
                      {'base_page': 'core/authentication/base_authentication.html'})
