from rest_framework.views import APIView
from rest_framework import status
from rest_framework_jwt.views import refresh_jwt_token
from rest_framework_simplejwt.tokens import RefreshToken
from user.user_profile.serializer.user_serializer import UserRegistrationSerializer, UserLoginSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.views import refresh_jwt_token
from django.contrib.auth import logout


class HelloView(APIView):

    def get(self, request):
        data = {'message': 'hello'}
        return Response(data)


@api_view(['POST'])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({'access_token': access_token}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


