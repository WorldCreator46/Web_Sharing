from .base import *


SECRET_KEY = 'django-insecure-xn$^r_3pahx!^sjiar@1k2+v!ez#-9@g3k2w240#@t=f9ln1db'

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}