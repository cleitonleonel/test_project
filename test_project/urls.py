"""test_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from apps.project.management.actions.api import register_frontend
from apps.views import index_page, login_page, signup_page, logout_page, change_password_page


urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', index_page),
    # Authentication rotes using the authentication modules resources.
    path('core/', include('otma.apps.core.authentication.urls')),
    url(r'^login/$', login_page),
    url(r'^signup/$', signup_page),
    url(r'^logout/$', logout_page),
    url(r'^change_password/$', change_password_page),
    url(r'api/(?P<company_repository>\w.+)/(?P<project_name>\w.+)/management/actions/register/frontend$',
        register_frontend),
    url(r'session_security/', include('session_security.urls')),
]
