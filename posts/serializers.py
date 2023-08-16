from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'user', 'post_content', 'likes', 'dislikes', 'created_at']
        depth = 1
