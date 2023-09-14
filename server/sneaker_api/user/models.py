from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser

#Nullable for development phase only
class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True,null=True)
    location = models.CharField(max_length=30, blank=True,null=True)
    role = models.IntegerField(default=5001)
    birth_date = models.DateField(blank=True,null=True)
    email = models.EmailField(max_length=50,blank=True,null=True)
    phone_number = models.CharField(max_length=25,blank=True,null=True)
    gender = models.CharField(max_length=10,blank=True,null=True)