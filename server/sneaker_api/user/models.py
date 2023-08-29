from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser

#Nullable for development phase only
class User(AbstractUser):
    bio = models.TextField(max_length=500, blank=True,null=True)
    location = models.CharField(max_length=30, blank=True,null=True)
    birth_date = models.DateField(blank=True,null=True)
    lastname = models.CharField(max_length=20,blank=True,null=True)
    firstname = models.CharField(max_length=20,blank=True,null=True)
    email = models.EmailField(max_length=20,blank=True,null=True)
    phone_number = models.IntegerField(blank=True,null=True)
    gender = models.CharField(max_length=10,blank=True,null=True)