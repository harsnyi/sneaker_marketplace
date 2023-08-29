from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from user.user_serializer import UserRegistrationSerializer
from rest_framework import status


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username


        return token

class MyTokenObtainParView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)

@api_view(['POST'])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors)


@api_view(['POST'])
def login_view(request):
    serializer = UserLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']

    # Generate JWT tokens
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    return Response({'access_token': access_token}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def secured_endpoint(request):
    # Your secured endpoint logic here
    return Response({'message': 'This is a secured endpoint. You need a valid JWT token to access it.'})

