from django.db import models
from user.models import User

class Product(models.Model):
    title = models.CharField(max_length=30, blank=True,null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    color = models.CharField(max_length=30, blank=True,null=True)
    price = models.IntegerField(blank=True,null=True)
    like_count = models.IntegerField(default=0)
    date = models.DateField(blank=True,null=True)

class LikedProduct(models.Model):
    """Relation between a liked product and a user who liked it"""
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)