from django.db import models
from authentication.models import User
from video_game.models import VideoGame

# Create your models here.

class UserCollection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video_game = models.ForeignKey(VideoGame, on_delete=models.CASCADE)
    completed = models.IntegerField(default=0) # 0 is false and 1 is true
