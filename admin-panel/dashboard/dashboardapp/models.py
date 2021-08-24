from django.db import models

# Create your models here.


class Users(models.Model):
    user_name = models.CharField(max_length=100, blank=False, default='')
    user_password = models.CharField(max_length=200, blank=False, default='')
    create_date = models.DateField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)


class Categories(models.Model):
    category_name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')


class Products(models.Model):
    product_name = models.CharField(max_length=100, blank=False, default='')
    category = models.ForeignKey(
        Categories, on_delete=models.CASCADE, default=None)
    description = models.CharField(max_length=100, blank=False, default='')
    create_date = models.DateField()
    price = models.IntegerField()
