# Generated by Django 3.2.5 on 2024-02-06 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0023_alter_user_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
