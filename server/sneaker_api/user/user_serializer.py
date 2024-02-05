from user.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Role


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password','last_name','first_name','email','phone_number','gender')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        role_list = [role.role for role in Role.objects.filter(user=user)]
        token['roles'] = role_list
        return token

class UserLoginSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username', 'password')