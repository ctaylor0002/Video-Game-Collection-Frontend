from rest_framework import serializers
from .models import UserCollection

class UserCollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserCollection
        fields = ['id', 'user', 'video_game', 'completed']
        depth = 1