from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
import re
from django.core.exceptions import ValidationError

EMAIL_REGEX = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
USERNAME_REGEX = r'^[a-zA-Z0-9_]+$'
PASSWORD_REGEX = r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$'

def validate_email(email): 
    if not re.match(EMAIL_REGEX, email):
        raise ValidationError(f"{email} nem helyes email cím.")

def validate_username(username):
    if not re.match(USERNAME_REGEX, username):
        raise ValidationError("Nem megfelelő formátum. A felhasználónév csak betűket, számokat és aláhúzást tartalmazhat.")
    if len(username) > 16:
        raise ValidationError("A felhasználónév legfeljebb 16 karakter hosszú lehet.")

class User(AbstractUser):
    
    username = models.CharField(
        max_length=140,
        unique=True,
        validators=[validate_username],
        error_messages={
            'unique': "Már létezik felhasználó a megadott felhasználónévvel.",
            'required': "Ez a mező kötelező.",
        },
    )
    
    bio = models.TextField(max_length=500, blank=True,null=True)
    location = models.CharField(max_length=30, blank=True,null=True)
    birth_date = models.DateField(blank=True,null=True)
    email = models.EmailField(validators=[validate_email],max_length=50,blank=True,null=True)
    phone_number = models.CharField(max_length=25,blank=True,null=True)
    gender = models.CharField(max_length=10,blank=True,null=True)

def validate_allowed_roles(value):
    allowed_roles = [4001, 5002, 6003, 7004]
    if value not in allowed_roles:
        raise ValidationError(f"{value} nem egy valós jogosultság. A jogosultságok: {allowed_roles}.")

class Role(models.Model):
    role = models.IntegerField(validators=[validate_allowed_roles],null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"