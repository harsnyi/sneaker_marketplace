# Generated by Django 3.2.5 on 2024-02-07 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0026_alter_user_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='username',
            field=models.CharField(error_messages={'required': 'Ez a mező kötelező.'}, max_length=140),
        ),
    ]