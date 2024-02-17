from .models import User
import re
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers


EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
USERNAME_REGEX = r'^[a-zA-Z0-9_]+$'
PHONE_REGEX = r'^\+36\d{2}-\d{3}-\d{4}$'

#Max upload size for profile pictures is 1MB for now
MAX_PROFILE_PICTURE_SIZE = 1_048_576

def validate_email(email): 
    try:            
        User.objects.get(email=email)
        raise serializers.ValidationError("Már létezik felhasználó a megadott email címmel.")
    except ObjectDoesNotExist:
        pass
        
    if not re.match(EMAIL_REGEX, email):
        raise serializers.ValidationError(f"{email} nem helyes email cím.")
        
    return email

def validate_username(username):
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
    
def validate_gender(gender):
    if gender not in [1,2,3,4]:
        raise serializers.ValidationError("Nem megfelelő nem.")

    return gender
    
def validate_phone_number(phone_number):
    if not re.match(PHONE_REGEX, phone_number):
        raise serializers.ValidationError(f"{phone_number} nem helyes telefonszám.")
    
    return phone_number
        
def validate_password(value):
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

def validate_profile_picture(profile_picture):
    if profile_picture:
        if profile_picture.size > MAX_PROFILE_PICTURE_SIZE:
            raise serializers.ValidationError("Túl nagy a kép mérete (> 1MB)")
        return profile_picture
    else:
        raise serializers.ValidationError("Nem sikerült a kép feltöltése.")