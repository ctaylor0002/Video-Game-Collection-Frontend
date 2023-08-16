from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import VideoGame
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .serializers import VideoGameSerializer

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_video_game(request):
    print(request.user)
    serializer = VideoGameSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save() # user=request.user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_video_games(request):
    video_games = VideoGame.objects.all()
    serializer = VideoGameSerializer(video_games, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)