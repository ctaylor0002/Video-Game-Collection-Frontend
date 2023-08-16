from rest_framework import status
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from django.shortcuts import get_object_or_404


from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# I need to make a way to get posts based on a user aswell
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_posts(request):
    print(request)
    posts= Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
    



@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_posts(request, user_id):
    print(request)
    posts = Post.objects.filter(user_id=user_id)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    # This is the way to get posts based on a specific user
    # posts = Post.objects.filter(user=user_id)
    # serializer = PostSerializer(posts, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_follower_posts(request, user_id):
#     followers = UserFollowers.objects.filter(main_user_id = request.user.id)
#     serializer = UserFollowerSerializer(followers, many=True)
    
    

# Like or dislike the post
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def like_or_dislike_post(request, pk):
    #Add a param for like or dislike
    like_or_dislike_param = request.query_params.get('type')
    like_or_dislike_value = request.query_params.get('value')
    post = get_object_or_404(Post, pk=pk)

    if like_or_dislike_param == 'like':
        if like_or_dislike_value == '1':    
            post.likes = (post.likes) + 1
        else:
            post.likes = (post.likes) -1

    elif like_or_dislike_param == 'dislike':
        if like_or_dislike_value == '1':
            post.dislikes = (post.dislikes) + 1
        else:
            post.dislikes = (post.dislikes) -1
    
    post.save()

    serializer = PostSerializer(post)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_post(request, pk):
    post = get_object_or_404(Post, pk=pk)

    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

    