# Generated by Django 4.1.4 on 2022-12-24 01:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('video_game', '0002_rename_video_game_videogame'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='videogame',
            name='completed',
        ),
    ]