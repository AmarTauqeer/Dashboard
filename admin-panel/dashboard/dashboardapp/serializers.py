from rest_framework import serializers
from dashboardapp.models import Categories, Products

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Users
#         fields = ('id',
#                   'user_name',
#                   'user_password',
#                   'create_date',
#                   'is_admin')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = ('id',
                  'category_name',
                  'description')


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = ('id',
                  'product_name',
                  'category',
                  'description',
                  'create_date',
                  'price')
