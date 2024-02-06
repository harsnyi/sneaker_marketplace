from rest_framework.response import Response
from .user_serializer import MyTokenObtainPairSerializer
from user.user_serializer import UserRegistrationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.views import APIView
from .user_serializer import UserLoginSerializer
from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from .models import Role, User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated


class Check_access_token(APIView):
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

class List_users(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_list = [user.username for user in User.objects.all()]
        return Response(user_list, status=status.HTTP_200_OK)
        

class Register_view(APIView):
    """Registers a new user with the added serializer.
    More logic needs to be done"""
    
    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            role = Role.objects.create(role=5002, user=user)
            # Send email here, etc.

            return Response({"message": "Felhasználó sikeresen regisztrálva"},status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class Authentication_view(APIView):
    """Authenticates the user, if the credentials are valid 
    the user gets an access front and an http only refresh token in the cookies"""
    
    def post(self, request, *args, **kwargs):
        
        #Check if the user credentials are valid
        serializer = UserLoginSerializer(data=request.data)
        
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            
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

                return response
                
            return JsonResponse({'error': 'User does not exists'}, status=400)    
        
        return JsonResponse({'error': 'Invalid Credentials'}, status=400)


class Update_access_token_view(APIView):
    """Validate the refresh token stored in the cookie,
    then givin out fresh access token """
    
    def get(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get('refresh_token')

        #Check if there is no refresh token between the cookies
        if not refresh_token:
            return Response({'error': 'No refresh token found in cookies'}, status=400)
        
        try:
            # Decode and validate the refresh token
            token = RefreshToken(refresh_token)        
        except Exception as e:
            return Response({'error': 'Invalid or expired refresh token'}, status=400)
        
        # Generate a new access token
        access_token = token.access_token

        response_data = {
           'access_token': str(access_token),
        }
        return Response(response_data)

class LogoutView(APIView):
    """Blacklists the given refresh token extracted from the cookies"""
    
    def post(self, request, *args, **kwargs):
        
        refresh_token = request.COOKIES.get('refresh_token')
        try:

            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=400)