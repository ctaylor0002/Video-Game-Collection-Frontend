from rest_framework import serializers
from .models import VideoGame

class VideoGameSerializer(serializers.ModelSerializer):

    class Meta:
        model = VideoGame
        fields = ['id', 'rawg_video_game_id', 'video_game_title', 'video_game_image']
        depth = 1