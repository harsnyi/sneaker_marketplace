# Generated by Django 3.2.5 on 2024-02-22 11:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0036_alter_changedusername_time_of_change'),
    ]

    operations = [
        migrations.AlterField(
            model_name='changedusername',
            name='time_of_change',
            field=models.DateTimeField(null=True),
        ),
    ]