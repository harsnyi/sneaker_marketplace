from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser

#Nullable for development phase only
class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True,null=True)
    location = models.CharField(max_length=30, blank=True,null=True)
    birth_date = models.DateField(blank=True,null=True)
    email = models.EmailField(max_length=50,blank=True,null=True)
    phone_number = models.CharField(max_length=25,blank=True,null=True)
    gender = models.CharField(max_length=10,blank=True,null=True)

def validate_allowed_roles(value):
    allowed_roles = [4001, 5002, 6003, 7004]
    if value not in allowed_roles:
        raise ValidationError(f"{value} is not a valid role. Valid roles are {allowed_roles}.")

class Role(models.Model):
    role = models.IntegerField(validators=[validate_allowed_roles],null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"