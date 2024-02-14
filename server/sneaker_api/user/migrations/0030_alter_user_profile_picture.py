# Generated by Django 3.2.5 on 2024-02-09 14:52

from django.db import migrations, models
import user.models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0029_alter_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, default='default_profile_pictures/1.png', null=True, upload_to=user.models.user_directory_path),
        ),
    ]