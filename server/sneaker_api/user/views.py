from rest_framework.response import Response
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.http import JsonResponse, HttpResponse
from .models import Role, User, ChangedUsername
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
import logging
import blurhash
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime
from dateutil.relativedelta import relativedelta
from django.utils import timezone

from .serializer import (
    MyTokenObtainPairSerializer,
    LoginSerializer,
    RegistrationSerializer,
    UploadProfilePictureSerializer,
    UserUpdateSerializer
)

# PENALTY_FOR_CHANGING_USERNAME ** user.username_change_count will be the blocking time
PENALTY_FOR_CHANGING_USERNAME = 5

logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

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

class ListUsers(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_list = [user.username for user in User.objects.all()]
        return Response(user_list, status=status.HTTP_200_OK)
        

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
            return JsonResponse({"message": "Felhasználó sikeresen regisztrálva"},status=status.HTTP_201_CREATED)

        return JsonResponse(serializer.errors,status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
                
            return JsonResponse({'error': 'Nem létezik a felhasználó.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        
        return JsonResponse(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class UploadProfilePicture(APIView):
    """The user can upload a profile picture for her/himself and it will be
    hashed shortly after(Blurhash)"""
    
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UploadProfilePictureSerializer(user,data=request.data)
        logging.info(f"Validating the new profile picture of {user.username}")
        
        if serializer.is_valid():
            profile_picture = serializer.validated_data['profile_picture']
            with profile_picture.open() as image_file:
                hash = blurhash.encode(image_file, x_components=4, y_components=3)
                user.profile_picture_hash = hash
                user.save()
                serializer.save()
        
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetProfilePicture(APIView):
    """Returns the profile picture and the profile picture hash of the user
    if the user is authenticated"""
    
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            logging.info(f"Profile picture: {user.profile_picture}")
            logging.info(f"Profile picture hash: {user.profile_picture_hash}")
            
            response = {
                'profile_picture_hash:': user.profile_picture_hash,
                'profile_picture': user.profile_picture.url
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Error while fetching data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetProfileData(APIView):
    """Returns the profile data of a user if the user is authenticated"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username, *args, **kwargs):
        logging.info(f"username: {username}")
        try:            
            user = User.objects.get(username=username)
            response = {
                'username': user.username,
                'profile_picture': user.profile_picture.url,
                'profile_picture_hash': user.profile_picture_hash,
                'last_name':user.last_name,
                'first_name':user.first_name,
                'phone_number':user.phone_number
            }
            return Response(response,status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error':'Nem létezik felhasználó a megadott névvel.'},status=status.HTTP_404_NOT_FOUND)

class GetUserData(APIView):
    """Returns the credentials of the authenticated user based on the auth token"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            response = {
                'username': user.username,
                'bio':user.bio,
                'profile_picture': user.profile_picture.url,
                'profile_picture_hash': user.profile_picture_hash,
                'last_name':user.last_name,
                'first_name':user.first_name,
                'phone_number':user.phone_number,
                'address':user.location
            }
            return Response(response,status=status.HTTP_200_OK)
        except Exception:
            return Response({'error': 'Error while fetching data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateUserData(APIView):
    """Updates the user credentials"""
    permission_classes = [IsAuthenticated]
    
    def put(self, request, *args, **kwargs):
        try:
            user = request.user
            
            serializer = UserUpdateSerializer(user, data=request.data, context={'request': request})
            
            if serializer.is_valid():
                new_username = serializer.validated_data['username']
                if new_username != user.username:
                    logging.info(f"User {user.username} wants to change username to {new_username}")
                    
                    if user.username_change_count >= 1:
                        if timezone.localtime(timezone.now()) > user.username_change_blocking_time:
                            logging.info(f"Enabled to change?  TRUE")
                            
                            delta = relativedelta(minutes= PENALTY_FOR_CHANGING_USERNAME ** user.username_change_count)
                            new_blocking_date = timezone.localtime(timezone.now()) + delta
                            user.username_change_blocking_time = new_blocking_date
                            logging.info(f"The penalty for changing username so often is {delta}")
                            logging.info(f"New blocking date is {new_blocking_date}")
                        else:
                            blocking_delta = relativedelta(user.username_change_blocking_time,timezone.localtime(timezone.now()))
                            logging.info(f"blocking_delta seconds: {blocking_delta.seconds}")
                            logging.info(f"blocking_delta minutes: {blocking_delta.minutes}")
                            logging.info(f"blocking_delta hours: {blocking_delta.hours}")
                            
                            #There is gotta be a nicer way for this
                            if blocking_delta.days > 0:
                                error_message = f'Nem módosíthatod a felhasználóneved eddig: {blocking_delta.days} nap'
                            elif blocking_delta.hours > 0:
                                error_message = f'Nem módosíthatod a felhasználóneved eddig: {blocking_delta.hours} óra'
                            else: 
                                error_message = f'Nem módosíthatod a felhasználóneved eddig: {blocking_delta.minutes} perc, {blocking_delta.seconds} másodperc'
                            
                            return Response({'non_field_errors': error_message}, status=status.HTTP_403_FORBIDDEN)
                    
                    user.username_change_count += 1
                    ChangedUsername.objects.create(
                        previous_username=user.username,
                        user=user,
                        time_of_change=timezone.localtime(timezone.now()))
                
                user = serializer.save()
                user.save()
                return Response({'message':'Sikeres módosítás'},status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception:
            return Response({'error': 'Error while fetching data.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
class UpdateAccessTokenView(APIView):
    """Validate the refresh token stored in the cookie,
    then givin out fresh access token """
    
    def get(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get('refresh_token')

        #Check if there is no refresh token between the cookies
        if not refresh_token:
            return JsonResponse({'error': 'No refresh token found in cookies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            # Decode and validate the refresh token
            token = RefreshToken(refresh_token)        
        except Exception:
            return Response({'error': 'Invalid or expired refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Generate a new access token
        access_token = token.access_token

        response_data = {
            'access_token': str(access_token),
        }
        return JsonResponse(response_data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    """Blacklists the given refresh token extracted from the cookies"""
    
    def get(self, request, *args, **kwargs):
        
        refresh_token = request.COOKIES.get('refresh_token')
        if not refresh_token:
            return JsonResponse({'error': 'No refresh token found in cookies'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        try:
            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            logging.info("Sikeres kijelentkezés.")
            return JsonResponse({"message": "Sikeres kijelentkezés."},status=status.HTTP_205_RESET_CONTENT)
        
        except Exception:
            return JsonResponse({'error': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)