# Generated by Django 3.2.5 on 2024-02-29 11:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0039_rename_isdefault_address_is_default'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='address_count',
            field=models.IntegerField(default=0),
        ),
    ]
