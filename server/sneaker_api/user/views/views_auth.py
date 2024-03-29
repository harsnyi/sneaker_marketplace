from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from ..models import Role
import logging

from ..serializer import (
    MyTokenObtainPairSerializer,
    LoginSerializer,
    RegistrationSerializer,
)

logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

class RegisterView(APIView):
    """Registers a new user with the added serializer.
    More logic needs to be done"""
    
    def post(self, request, *args, **kwargs):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            role = Role.objects.create(role=5002, user=user)
            
            # Send email here, etc.
            logging.info("Sikeres regisztrálás.")
            return Response({'message': 'Felhasználó sikeresen regisztrálva'}, status=status.HTTP_201_CREATED)

        return Response({'message': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AuthenticationView(APIView):
    """Authenticates the user, if the credentials are valid 
    the user gets an access front and an http only refresh token in the cookies"""
    
    def post(self, request, *args, **kwargs):
        
        #Check if the user credentials are valid
        serializer = LoginSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, username=email, password=password)
            
            #Check if the user exists
            if user is not None:
                token = MyTokenObtainPairSerializer
                refresh = token.get_token(user)

                response = HttpResponse()
                response.set_cookie('refresh_token', str(refresh), httponly=True)
        
                json_response = JsonResponse({'access_token': str(refresh.access_token)})
                response.status_code = json_response.status_code
                response.content = json_response.content
                response['content-type'] = json_response['content-type']
                logging.info("Sikeres bejelentkezés.")
                
                return response
                
            return Response({'message': 'Nem létezik a felhasználó.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        
        return Response({'message': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class CheckAccessToken(APIView):
    def get(self, request):
        authorization_header = request.headers.get('Authorization', '')

        if not authorization_header.startswith('Bearer '):
            return Response({"message": "Invalid Authorization header format"}, status=status.HTTP_401_UNAUTHORIZED)

        access_token_string = authorization_header.split(' ')[-1]

        try:
            token = AccessToken(access_token_string)
            token_payload = token.payload
        except Exception as e:
            return Response({"message": "Invalid access token", "error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)

        if token_payload.get('exp') is not None:
            return Response({"message": "Access token is valid"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Access token is missing expiration time"}, status=status.HTTP_401_UNAUTHORIZED)
        

class UpdateAccessTokenView(APIView):
    """Validate the refresh token stored in the cookie,
    then givin out fresh access token """
    
    def get(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get('refresh_token')

        #Check if there is no refresh token between the cookies
        if not refresh_token:
            return Response({'message': 'No refresh token found in cookies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            # Decode and validate the refresh token
            token = RefreshToken(refresh_token)        
        except Exception as error:
            return Response({'message': 'Invalid or expired refresh token', 'error': str(error)}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Generate a new access token
        access_token = token.access_token

        #TODO Response üzenet elé 'message'
        response_data = {
            'access_token': str(access_token),
        }
        return Response(response_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    """Blacklists the given refresh token extracted from the cookies"""
    
    def get(self, request, *args, **kwargs):
        
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return Response({'message': 'No refresh token found in cookies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            logging.info("Sikeres kijelentkezés.")
            return Response({'message': 'Sikeres kijelentkezés.'}, status=status.HTTP_205_RESET_CONTENT)
        
        except Exception as error:
            return Response({'message': 'Invalid refresh token', 'error': str(error)}, status=status.HTTP_401_UNAUTHORIZED)