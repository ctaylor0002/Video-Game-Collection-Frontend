from django.db import models
from authentication.models import User
from video_game.models import VideoGame
# from followers.models import UserFollowers

# Create your models here.

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


# class Car(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     make = models.CharField(max_length=30)
#     model = models.CharField(max_length=100)
#     year = models.IntegerField()

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="images/", default='../images/base_profile_picture.jpg')
    profile_description = models.CharField(max_length=1000, default="Brand New User :)")
    # collection = models.ForeignKey(UserCollection, on_delete=models.CASCADE, default=None)
    # user_profile_follewers = models.ManyToManyField(to='followers.UserFollowers')


