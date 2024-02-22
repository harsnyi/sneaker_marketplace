from .models import User
import re
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from django.utils.translation import gettext as _
import logging

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
USERNAME_REGEX = r'^[a-zA-Z0-9_]+$'
PHONE_REGEX = r'^\+36\d{2}-\d{3}-\d{4}$'
CHECK_FOR_BAD_WORDS = False

BAD_LANGUAGE_LIST_PATH = "../resources/filter_words/bad_language_list.csv"

#Max upload size for profile pictures is 1MB for now
MAX_PROFILE_PICTURE_SIZE = 1_048_576

logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

def validate_email(email): 
    try:            
        User.objects.get(email=email)
        raise serializers.ValidationError({
            'email': _("Már létezik felhasználó a megadott email címmel.")
        })
    except ObjectDoesNotExist:
        pass
        
    if not re.match(EMAIL_REGEX, email):
        raise serializers.ValidationError({
            'email': _(f"{email} nem helyes email cím.")
        })
        
    return email

#Super basic solution
def search_for_badword(text):
    lowered_text = text.lower()
    with open(BAD_LANGUAGE_LIST_PATH, mode="r", encoding="utf-8") as file:
        for line in file:
            word = line.strip().lower()
            if word in lowered_text:
                return True
    return False

def validate_username(username):
    
    if CHECK_FOR_BAD_WORDS:
        if search_for_badword(username):
            raise serializers.ValidationError({
                'username': _("Nem megfelelő nyelvezet.")
            })
    
    try:
        User.objects.get(username=username)
        raise serializers.ValidationError({
                'username': _("Már létezik felhasználó a megadott felhasználónévvel.")
        })
    except ObjectDoesNotExist:
        pass
        
    if not re.match(USERNAME_REGEX, username):
        raise serializers.ValidationError({
                'username': _("Nem megfelelő formátum. A felhasználónév csak betűket, számokat és aláhúzást tartalmazhat.")
        })
        
    if len(username) > 16:
        raise serializers.ValidationError({
                'username': _("A felhasználónév legfeljebb 16 karakter hosszú lehet.")
        })
        
    return username
    
def validate_gender(gender):
    if gender not in [1,2,3,4]:
        raise serializers.ValidationError({
                'gender': _("Nem megfelelő nem.")
        })
    
    return gender
    
def validate_phone_number(phone_number):
    if not re.match(PHONE_REGEX, phone_number):
        raise serializers.ValidationError({
                'phone_number': _(f"{phone_number} nem helyes telefonszám.")
        })
        
    return phone_number
        
def validate_password(password):
    if len(password) < 8:
        raise serializers.ValidationError({
                'password': _("A jelszónak legalább 8 karakter hosszúnak kell lennie.")
        })
        
    elif len(password) > 20:
        raise serializers.ValidationError({
                'password': _("A jelszó legfeljebb 20 karakter hosszú lehet.")
        })
        
    elif not re.search(r'\d', password):
        raise serializers.ValidationError({
                'password': _("A jelszónak tartalmaznia kell legalább egy számot.")
        })
        
    elif not re.search(r'[a-z]', password):
        raise serializers.ValidationError({
                'password': _("A jelszónak tartalmaznia kell legalább egy kisbetűt.")
        })
    
    elif not re.search(r'[A-Z]', password):
        raise serializers.ValidationError({
                'password': _("A jelszónak tartalmaznia kell legalább egy nagybetűt.")
        })
    
    return password

def validate_profile_picture(profile_picture):
    if profile_picture:
        if profile_picture.size > MAX_PROFILE_PICTURE_SIZE:
            raise serializers.ValidationError({
                'profile_picture': _("Túl nagy a kép mérete (> 1MB)")
            })
            
        return profile_picture
    else:
        raise serializers.ValidationError({
                'profile_picture': _("Nem sikerült a kép feltöltése.")
            })