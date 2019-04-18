from django.contrib.auth import logout
from django.shortcuts import render, redirect


# from apps.project.management.actions.validators import check_islogged


def index_page(request):
    return render(request, "blank_page.html", {'base_page': 'base_page.html'})


def login_page(request):
    return render(request, "core/authentication/login.html",
                  {'base_page': 'core/authentication/base_authentication.html'})


def signup_page(request):
    return render(request, "core/authentication/signup.html",
                  {'base_page': 'core/authentication/base_authentication.html'})


def logout_page(request):
    if request.user.is_authenticated:
        logout(request)
        return redirect("/login")
    else:
        return render(request, "core/authentication/logout_error.html",
                      {'base_page': 'core/authentication/base_authentication.html'})


def change_password_page(request):
    if request.user.is_authenticated:
        return render(request, "core/authentication/change_password.html",
                      {'base_page': 'core/authentication/base_authentication.html'})
    else:
        return redirect("/login")


def entities(request):
    return render(request, "core/entities/entities.html", {'base_page': 'base_page.html'})
