from django.urls import path, include
from followers import views

urlpatterns = [
    path('<int:user_id>', views.following),
    path('list/<int:user_id>', views.followers),
    path('delete/', views.delete_following)
    
]