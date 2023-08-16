from rest_framework import status
from rest_framework.response import Response
from .models import UserFollowers
from .serializers import UserFollowerSerializer
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
# Create your views here.

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def following(request, user_id):
    if (request.method == 'GET'):
        following = UserFollowers.objects.filter(main_user_id = user_id)
        serializer = UserFollowerSerializer(following, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif (request.method == 'POST'):
        print(request.data)
        serializer = UserFollowerSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save(main_user_id=request.data['main_user'], follower_user_id=request.data['follower_user'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_following(request):
    follower_user = request.query_params.get('follower_user')
    main_user = request.query_params.get('main_user')

    line = UserFollowers.objects.filter(main_user_id = main_user, follower_user_id = follower_user)
    line.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers(request, user_id):
    followers = UserFollowers.objects.filter(follower_user_id = user_id)
    serializer = UserFollowerSerializer(followers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)