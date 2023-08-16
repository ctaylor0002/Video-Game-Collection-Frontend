from django.urls import path, include
from posts import views

urlpatterns = [
    path('', views.create_post),
    path('<int:user_id>/', views.get_user_posts),
    path('all/', views.get_all_posts),
    path('type/<int:pk>', views.like_or_dislike_post),
    path('delete/<int:pk>', views.delete_post),
    # path('creation/', views.create_profile),
    # path('update/<int:pk>/', views.profile_management),
]