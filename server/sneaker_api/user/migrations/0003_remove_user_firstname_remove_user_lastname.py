# Generated by Django 4.2.4 on 2023-08-29 18:53

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0002_user_firstname_user_gender_user_lastname_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="firstname",
        ),
        migrations.RemoveField(
            model_name="user",
            name="lastname",
        ),
    ]
