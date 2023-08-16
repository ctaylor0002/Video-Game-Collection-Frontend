# Generated by Django 4.1.4 on 2022-12-19 18:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('followers', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_profile', '0003_userprofile_rename_user_collection_usercollection_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userfollowers',
            name='follower',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile'),
        ),
        migrations.AddField(
            model_name='userfollowers',
            name='main_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]