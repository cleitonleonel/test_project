"""
Django settings for test_project project.

Generated by 'django-admin startproject' using Django 2.2.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
from conf.profile import POSTGRES_USER, POSTGRES_PASSWORD, BOWER_PATH
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '@y-)04u*je#)vtl(ni$%d714c$8*27tz4z0b2u)ozc#*ljh8h6'
GOOGLE_KEY = "AIzaSyA5pZBwmGJJ8f8POml7158nP2yxgvFtoXA"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'otma.apps.core.authentication',
    'otma.apps.core.commons',
    'otma.apps.core.communications',
    'otma.apps.core.management',
    'otma.apps.core.security',
    'otma.apps.entities',
    'djangobower',

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

#CONTEXT_PROCESSORS = "django.core.context_processors.request"

ROOT_URLCONF = 'test_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'test_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'test_project',
        'USER': POSTGRES_USER,
        'PASSWORD': POSTGRES_PASSWORD,
        'HOST': '127.0.0.1',
        'DROP': True,
        'SINGLE_TRANSACTION': False,
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_L10N = True

USE_TZ = True


REQUIREMENTS = r'conf/requirements/dependencies.txt'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'static_root/') # os.path.join(BASE_DIR, 'static/') #STATIC_URL
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static'), ]

AUTH_USER_MODEL = 'authentication.User'
LOGIN_REDIRECT_URL = "/login"
LOGIN_URL = '/login'

ERRORS_MESSAGES = {
    'invalid': 'Conteúdo inválido',
    'document_invalid': 'Documento inválido',

    'required': 'Campo obrigatório',
    'blank': 'Campo obrigatório',
    'unique':"Informação já cadastrada",

    'future_date':'Data de nascimento inválida',
    'minimum_age_person':'Precisa ter mais de 18 anos.',
    'maximum_age_person':'Precisa ter menos que 150 anos.',

    'name_min_words':'Informe o nome completo',
    'not_all_numeric':'Este campo só pode conter numeros'
}

OTMA_SERVER = "http://68.183.97.68"

BOWER_PATH = BOWER_PATH
BOWER_COMPONENTS_ROOT = os.path.join(BASE_DIR, 'static')
BOWER_INSTALLED_APPS = (
    'vue',
    'jquery',
    'bootstrap',
    'bootstrap-select',
    'jquery-nicescroll',
    'font-awesome',
    'nprogress',
    'pnotify#3.2.1',
    'moment',
    #https://github.com/snokier/v-contextmenu
    #'vue-resize-mixin',
    #'rateyo'

)


FILTER_COUNTRY  = True
FILTER_STATE    = True
FILTER_CITY     = False
FILTER_DISTRICT = False
FILTER_IP       = False

AUTHORIZED_IPS = ['179.234.250.164']
AUTHORIZED_COUNTRIES = {
    "BR": {
        "ES":{
            "VITÓRIA":["ENSEADA DO SUÁ", "JARDIM DA PENHA", "SANTA LÚCIA"],
            "VILA VELHA":["PRAIA DA COSTA", "ITAPUÃ", "ITAPARICA"],
            "CARIACICA": ["JARDIM AMÉRICA", "ITAQUARI", "CAMPO GRANDE"],
            "SERRA":["LARANJEIRAS", "MANGUINGOS", "CARAPINA"],
            "GUARAPARI":["CENTRO", "MUQUIÇABA", "PRAIA DO MORRO"],
            "VIANA":["MARCILHO DE NORONHA", "INDUSTRIAL", "PRIMAVERA"]
        },
        "SP":[],
        "RJ":[]
    },
}