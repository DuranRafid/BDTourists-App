from django.contrib import admin
from django.apps import apps

from abstractApp.models import User
# Register your models here.

app_models = apps.get_app_config('abstractApp').get_models()
for model in app_models:
        admin.site.register(model)