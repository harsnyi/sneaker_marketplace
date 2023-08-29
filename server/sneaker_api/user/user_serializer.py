from user.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password','last_name','first_name','email','phone_number','gender')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(TokenObtainPairSerializer):
    email = serializers.CharField(max_length = 40)
    password = serializers.CharField(write_only = True)
    
    def validate(self,attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            user = User.objects.filter(email = email).first()
            
            if user is not None and user.check_password(password):
                attrs['user'] = user
            else:
                raise serializers.ValidationError('Invalid login credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')

        return attrs