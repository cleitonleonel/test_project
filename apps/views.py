from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, "base_page.html", {'base_page': 'base_page.html'})
