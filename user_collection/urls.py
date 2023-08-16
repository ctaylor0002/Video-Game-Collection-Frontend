from django.urls import path, include
from user_collection import views

urlpatterns = [
    path('<int:user_id>', views.user_collection),
    path('<int:pk>/update/', views.update_user_collection),
]