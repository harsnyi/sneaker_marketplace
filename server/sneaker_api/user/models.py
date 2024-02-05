from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
import re
from django.core.exceptions import ValidationError


def validate_email(email): 
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, email):
        raise ValidationError(f"{email} nem helyes email cím.")


class User(AbstractUser):
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