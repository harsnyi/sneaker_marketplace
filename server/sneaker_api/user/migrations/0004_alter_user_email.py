# Generated by Django 3.2.5 on 2023-09-12 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_remove_user_firstname_remove_user_lastname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=50, null=True),
        ),
    ]
