from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.db.models import Q

from dashboardapp.models import Categories, Products, Users
from dashboardapp.serializers import CategorySerializer, ProductsSerializer, UserSerializer
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema

from django.contrib.auth.hashers import make_password, check_password

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


@swagger_auto_schema(methods=['post'], request_body=CategorySerializer)
@api_view(['POST'])
def add_category(request):
    print(request.data)
    if request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
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


@swagger_auto_schema(methods=['put'], request_body=CategorySerializer)
@api_view(['PUT'])
def update_category(request, id):
    if request.method == 'PUT':
        category = Categories.objects.get(pk=id)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(methods=['post'], request_body=UserSerializer)
@api_view(['POST'])
def add_user(request):
    if request.method == 'POST':
        pass_encrypt = make_password(request.data['user_password'])
        user_data = {
            "user_name": request.data['user_name'],
            "user_password": pass_encrypt,
        }
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(methods=['post'], request_body=UserSerializer)
@api_view(['POST'])
def check_user(request):
    if request.method == 'POST':
        user = Users.objects.get(user_name=request.data['user_name'])
        if user:
            match_password = check_password(
                request.data['user_password'], user.user_password)
            if match_password:
                return JsonResponse("Found", safe=False)
            else:
                return JsonResponse("Email or password incorrect", safe=False)
        else:
            return JsonResponse("Email or password incorrect", safe=False)


@api_view(['PUT'])
def change_password(request):
    if request.method == 'PUT':
        user = Users.objects.get(user_name=request.data['user_name'])
        print(user)
        if user:
            match_password = check_password(
                request.data['old_password'], user.user_password)
            pass_encrypt = make_password(request.data['user_password'])
            if match_password:
                new_data = {
                    "user_name": user.user_name,
                    "user_password": pass_encrypt
                }
                serializer = UserSerializer(user, data=new_data)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse(serializer.data)
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return JsonResponse("Email or password incorrect", safe=False)
        else:
            return JsonResponse("Email or password incorrect", safe=False)
