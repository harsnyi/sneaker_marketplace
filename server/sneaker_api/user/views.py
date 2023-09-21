from rest_framework.response import Response
from .user_serializer import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.user_serializer import UserRegistrationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken,AccessToken
from rest_framework.views import APIView


#Registers a new user with the added serializer.
#More logic needs to be done
class Register_view(APIView):
    def post(self,request, *args, **kwargs):
    
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            
            #Send email here etc...
            user = serializer.save()
            
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors)

#Validate the refresh token stored in the cookie, 
#then givin out fresh access token
class Update_access_token_view(APIView):
    def post(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            # Handle the case when there is no refresh token in cookies
            return Response({'error': 'No refresh token found in cookies'}, status=400)
        
        try:
            # Decode and validate the refresh token
            token = RefreshToken(refresh_token)        
        except Exception as e:
            # Handle invalid or expired refresh token
            return Response({'error': 'Invalid or expired refresh token'}, status=400)
        
        # Generate a new access token
        access_token = token.access_token

        # You can customize the response data as needed
        response_data = {
            'access_token': str(access_token),
        }

        return Response(response_data)

#Simple JWT refresh and access token 
class MyTokenObtainParView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#Blacklists the given refresh token extracted from the cookies
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        
        refresh_token = request.COOKIES.get('refresh_token')
        try:

            refresh = RefreshToken(refresh_token)
            refresh.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        
        except Exception as e:
            return Response({'error': 'Invalid refresh token'}, status=400)