from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Role
import re


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

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
        user = User.objects.create_user(**validated_data)
        return user
    
    def validate(self, data):
        self.validate_password(data['password'])
        return data


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