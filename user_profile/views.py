from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes


# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def create_profile(request):

    print(request.user)
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET'])
@permission_classes([AllowAny])
def get_profile(request, pk):
    profile = get_object_or_404(UserProfile, user_id=pk)
    # profile = UserProfile.objects.filter(pk=pk)
    print(profile)
    serializer = UserProfileSerializer(profile)
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def profile_management(request, pk):
    print(request.data)
    profile = get_object_or_404(UserProfile, pk=pk)
    serializer = UserProfileSerializer(profile, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)

    
