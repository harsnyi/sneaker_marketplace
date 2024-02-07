from .models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Role
import re
from django.core.exceptions import ObjectDoesNotExist

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
USERNAME_REGEX = r'^[a-zA-Z0-9_]+$'

class UserRegistrationSerializer(serializers.ModelSerializer):
    
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
        if not re.match(USERNAME_REGEX, username):
            raise serializers.ValidationError("Nem megfelelő formátum. A felhasználónév csak betűket, számokat és aláhúzást tartalmazhat.")
        if len(username) > 16:
            raise serializers.ValidationError("A felhasználónév legfeljebb 16 karakter hosszú lehet.")
        
        return username
    
    def validate_gender(self, gender):
        if gender not in [1,2,3,4]:
            raise serializers.ValidationError("Nem megfelelő nem.")

        return gender
    
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
        self.validate_email(data['email'])
        self.validate_username(data['username'])
        self.validate_password(data['password'])
        self.validate_gender(data['gender'])
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
        fields = ('email', 'password')