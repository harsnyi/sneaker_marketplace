from django.contrib import admin
from .models import Product, LikedProduct

admin.site.register(Product)
admin.site.register(LikedProduct)
