from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


class HelloView(APIView):

    def get(self, request):
        data = {'message': 'hello'}
        return Response(data)
