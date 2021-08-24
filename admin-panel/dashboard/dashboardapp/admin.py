from django.contrib import admin
from .models import Categories, Products, Users

# Register your models here.
admin.site.register(Categories)
admin.site.register(Products)
admin.site.register(Users)
