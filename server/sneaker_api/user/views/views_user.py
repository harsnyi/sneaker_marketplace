from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import User
from rest_framework.permissions import IsAuthenticated
import logging
from django.core.exceptions import ObjectDoesNotExist

logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

class ListUsers(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user_list = [user.username for user in User.objects.all()]
        return Response(user_list, status=status.HTTP_200_OK)
        
        
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
            return Response({'message': response},status=status.HTTP_200_OK)
        
        except ObjectDoesNotExist as error:
            return Response({'message':'Nem létezik felhasználó a megadott névvel.', 'error': str(error)},status=status.HTTP_404_NOT_FOUND)
