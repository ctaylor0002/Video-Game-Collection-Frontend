from rest_framework import serializers
from .models import UserFollowers

class UserFollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFollowers
        fields = ['main_user', 'follower_user']
        depth = 1
