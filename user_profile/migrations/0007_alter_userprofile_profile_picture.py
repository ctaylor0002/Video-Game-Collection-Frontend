# Generated by Django 4.1.4 on 2022-12-19 21:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0006_remove_userprofile_user_profile_follewers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_picture',
            field=models.ImageField(default='../images/base_profile_picture.jpg', upload_to=''),
        ),
    ]