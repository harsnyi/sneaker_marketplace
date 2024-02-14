from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Role
import re
from django.core.exceptions import ObjectDoesNotExist
import random

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
USERNAME_REGEX = r'^[a-zA-Z0-9_]+$'
PHONE_REGEX = r'^\+36\d{2}-\d{3}-\d{4}$'
DEFAULT_PROFILE_NUMBER_START = 1
DEFAULT_PROFILE_NUMBER_END = 5

#Max upload size for profile pictures is 1MB for now
MAX_PROFILE_PICTURE_SIZE = 1048576

class RegistrationSerializer(serializers.ModelSerializer):
    
    def validate_email(self, email): 
        try:            
            User.objects.get(email=email)
            raise serializers.ValidationError("Már létezik felhasználó a megadott email címmel.")
        except ObjectDoesNotExist:
            pass
        
        if not re.match(EMAIL_REGEX, email):
            raise serializers.ValidationError(f"{email} nem helyes email cím.")
        
        return email

    def validate_username(self, username):
        try:            
            User.objects.get(username=username)
            raise serializers.ValidationError("Már létezik felhasználó a megadott felhasználónévvel.")
        except ObjectDoesNotExist:
            pass
        
        if not re.match(USERNAME_REGEX, username):
            raise serializers.ValidationError("Nem megfelelő formátum. A felhasználónév csak betűket, számokat és aláhúzást tartalmazhat.")
        if len(username) > 16:
            raise serializers.ValidationError("A felhasználónév legfeljebb 16 karakter hosszú lehet.")
        
        return username
    
    def validate_gender(self, gender):
        if gender not in [1,2,3,4]:
            raise serializers.ValidationError("Nem megfelelő nem.")

        return gender
    
    def validate_phone_number(self, phone_number):
        if not re.match(PHONE_REGEX, phone_number):
            raise serializers.ValidationError(f"{phone_number} nem helyes telefonszám.")
        return phone_number
        
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('A jelszónak legalább 8 karakter hosszúnak kell lennie.')
        elif len(value) > 20:
            raise serializers.ValidationError('A jelszó legfeljebb 20 karakter hosszú lehet.')
        elif not re.search(r'\d', value):
            raise serializers.ValidationError('A jelszónak tartalmaznia kell legalább egy számot.')
        elif not re.search(r'[a-z]', value):
            raise serializers.ValidationError('A jelszónak tartalmaznia kell legalább egy kisbetűt.')
        elif not re.search(r'[A-Z]', value):
            raise serializers.ValidationError('A jelszónak tartalmaznia kell legalább egy nagybetűt.')
        return value
    
    class Meta:
        model = User
        fields = ('username','password','last_name','first_name','email','phone_number','gender')

    def create(self, validated_data):
        default_profile_random = random.randint(DEFAULT_PROFILE_NUMBER_START, DEFAULT_PROFILE_NUMBER_END)
        validated_data['profile_picture'] = f"default_profile_pictures/{default_profile_random}.png"
        user = User.objects.create_user(**validated_data)
        return user
    
    def validate(self, data):
        self.validate_email(data['email'])
        self.validate_username(data['username'])
        self.validate_password(data['password'])
        self.validate_phone_number(data['phone_number'])
        self.validate_gender(data['gender'])
        return data



class UploadProfilePictureSerializer(serializers.ModelSerializer):
    
    def validate_profile_picture(self,profile_picture):
        if profile_picture:
            if profile_picture.size > MAX_PROFILE_PICTURE_SIZE:
                raise serializers.ValidationError("Túl nagy a kép mérete (> 1MB)")
            return profile_picture
        else:
            raise serializers.ValidationError("Nem sikerült a kép feltöltése.")
    
    class Meta:
        model = User
        fields = ('profile_picture',)
        
    def validate(self, data):
        self.validate_profile_picture(data['profile_picture'])
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