from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
import blurhash

class User(AbstractUser):
    
    username = models.CharField(
        max_length=140,
        error_messages={
            'required': "Ez a mező kötelező.",
        },
    )
    email = models.EmailField(
        max_length=50,
        blank=True,
        null=True,
        error_messages={
            'required': "Ez a mező kötelező.",
        },
    )
    gender = models.IntegerField(blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True, null=True)
    location = models.CharField(max_length=30, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    phone_number = models.CharField(max_length=25, blank=True, null=True)
    profile_picture = models.ImageField(upload_to=f'profile_pictures/', null=True, blank=True)
    profile_picture_hash = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        if self.profile_picture and not self.profile_picture_hash:
            with self.profile_picture.open() as image_file:
                hash = blurhash.encode(image_file, x_components=4, y_components=3)
                self.profile_picture_hash = hash
                super().save(*args, **kwargs)
        else:
            super().save(*args, **kwargs)


def validate_allowed_roles(value):
    allowed_roles = [4001, 5002, 6003, 7004]
    if value not in allowed_roles:
        raise ValidationError(f"{value} nem egy valós jogosultság. A jogosultságok: {allowed_roles}.")

class Role(models.Model):
    role = models.IntegerField(validators=[validate_allowed_roles],null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"