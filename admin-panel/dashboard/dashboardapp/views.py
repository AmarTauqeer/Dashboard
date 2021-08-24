
from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.db.models import Q

from dashboardapp.models import Categories, Products, Users
from dashboardapp.serializers import CategorySerializer, ProductsSerializer, UserSerializer
from rest_framework.decorators import api_view

"""
    endpoints
"""


@api_view(['GET'])
def all_category(request):
    if request.method == 'GET':
        categories = Categories.objects.all()

        category_name = request.GET.get('category_name', None)
        if category_name is not None:
            categories = categories.filter(
                category_name__icontains=category_name)

        serializer = CategorySerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def add_category(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CategorySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_category(request, id):
    if request.method == 'DELETE':
        category = Categories.objects.get(pk=id)
        category.delete()
        return JsonResponse({'message': 'User was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def update_category(request, id):
    if request.method == 'PUT':
        category = Categories.objects.get(pk=id)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_user(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def check_user(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        condition1 = Q(user_password__icontains=user_data['user_password'])
        condition2 = Q(user_name__icontains=user_data['user_name'])
        user_found = Users.objects.filter(condition1 & condition2)
        # print(len(user_found))
        if len(user_found) != 0:
            return JsonResponse("Found", safe=False)
        else:
            return JsonResponse("Not found", safe=False)
