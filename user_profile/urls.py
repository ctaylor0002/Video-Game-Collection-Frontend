from django.urls import path, include
from user_profile import views

urlpatterns = [
    path('<int:pk>/', views.get_profile),
    path('creation/', views.create_profile),
    path('update/<int:pk>/', views.profile_management),
]