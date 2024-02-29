from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import ChangedUsername
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
import logging
import blurhash
from dateutil.relativedelta import relativedelta
from django.utils import timezone

from ..serializer import (
    UploadProfilePictureSerializer,
    UserUpdateSerializer,
)

logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

# PENALTY_FOR_CHANGING_USERNAME ** user.username_change_count will be the blocking time
PENALTY_FOR_CHANGING_USERNAME = 5

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
                
            return Response({'message': 'Sikeres feltöltés.'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
            return Response({'message': response}, status=status.HTTP_200_OK)
        
        except Exception as error:
            return Response({'message': 'Hiba a lekérdezés közben.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
            return Response({'message': response}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'message': 'Hiba a lekérdezés közben.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

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
                            
                            return Response({'message': error_message}, status=status.HTTP_403_FORBIDDEN)
                    
                    user.username_change_count += 1
                    ChangedUsername.objects.create(
                        previous_username=user.username,
                        user=user,
                        time_of_change=timezone.localtime(timezone.now()))
                
                user = serializer.save()
                user.save()
                return Response({'message': 'Sikeres módosítás'}, status=status.HTTP_200_OK)

            return Response({'message': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        except Exception as error:
            return Response({'message': 'Hiba a lekérdezés közben.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)