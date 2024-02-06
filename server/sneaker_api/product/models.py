from django.db import models
from user.models import User

class Product(models.Model):
    title = models.CharField(max_length=30, blank=True,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    price = models.IntegerField(blank=True,null=True)