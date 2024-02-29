from django.contrib import admin
from .models import User, Address, Role, ChangedUsername

admin.site.register(User)
admin.site.register(Address)
admin.site.register(Role)
admin.site.register(ChangedUsername)