from django.db import models

# Create your models here.

# class Car(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     make = models.CharField(max_length=30)
#     model = models.CharField(max_length=100)
#     year = models.IntegerField()

class VideoGame(models.Model):
    rawg_video_game_id = models.CharField(max_length=25)
    video_game_title = models.CharField(max_length=50)
    video_game_image = models.CharField(max_length=255)
    
