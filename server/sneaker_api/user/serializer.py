from .models import User, Role
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import random
import logging

from .validators import (
    validate_email,
    validate_username,
    validate_password,
    validate_gender,
    validate_phone_number,
    validate_profile_picture
)

DEFAULT_PROFILE_NUMBER_START = 1
DEFAULT_PROFILE_NUMBER_END = 5


logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

class RegistrationSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username','password','last_name','first_name','email','phone_number','gender')

    def create(self, validated_data):
        default_profile_random = random.randint(DEFAULT_PROFILE_NUMBER_START, DEFAULT_PROFILE_NUMBER_END)
        validated_data['profile_picture'] = f"default_profile_pictures/{default_profile_random}.png"
        user = User.objects.create_user(**validated_data)
        return user
    
    def validate(self, data):
        validate_email(data['email'])
        validate_username(data['username'])
        validate_password(data['password'])
        validate_phone_number(data['phone_number'])
        validate_gender(data['gender'])
        return data

class UserUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('username','last_name','first_name','bio','phone_number')
    
    def validate(self, data):
        username = data.get('username')
        request_username = self.context['request'].user.username
        
        logging.info(f"request_user: {request_username}")
        logging.info(f"username: {username}")
        
        if username and username != request_username:
            validate_username(username)
        
        validate_phone_number(data['phone_number'])
        return data
    
class UploadProfilePictureSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('profile_picture',)
        
    def validate(self, data):
        validate_profile_picture(data['profile_picture'])
        return data

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        role_list = [role.role for role in Role.objects.filter(user=user)]
        token['roles'] = role_list
        return token

class LoginSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('email', 'password')