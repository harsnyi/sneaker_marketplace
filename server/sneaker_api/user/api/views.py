from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.user_serializer import UserRegistrationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role

        return token

class MyTokenObtainParView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors)


class CustomTokenRefreshView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):

        refresh_token = request.COOKIES.get('refresh')
        print(refresh_token)

        if not refresh_token:
            # Handle the case when there is no refresh token in cookies
            return Response({'error': 'No refresh token found in cookies'}, status=400)
        
        try:
            # Decode and validate the refresh token
            token = RefreshToken(refresh_token)
            token_data = token.validated_token
        except Exception as e:
            # Handle invalid or expired refresh token
            return Response({'error': 'Invalid or expired refresh token'}, status=400)
        
        # Generate a new access token
        access_token = token_data.access_token
        new_token = self.token_serializer.get_token(user=request.user)

        # You can customize the response data as needed
        response_data = {
            'access': str(new_token),
        }

        return Response(response_data)





