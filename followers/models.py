from django.db import models
from authentication.models import User

# Create your models here.


class UserFollowers(models.Model):
    main_user = models.ForeignKey(User, on_delete=models.CASCADE)
    follower_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='follower')
    