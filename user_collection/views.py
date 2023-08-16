from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import UserCollection
from .serializers import UserCollectionSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes


# Create your views here.
        
@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_collection(request, user_id):
    if (request.method == 'GET'):
        collection = UserCollection.objects.filter(user=user_id)
        serializer = UserCollectionSerializer(collection, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif (request.method == 'POST'):
        serializer = UserCollectionSerializer(data=request.data)
        # print(request.data["video_game_id"])
        if serializer.is_valid():
            serializer.save(user=request.user, video_game_id=request.data["id"])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_user_collection(request, pk):
    video_game = get_object_or_404(UserCollection, pk=pk)
    if (request.method == 'PATCH'):
        serializer = UserCollectionSerializer(video_game, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK) 
    elif (request.method == 'DELETE'):
        video_game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
