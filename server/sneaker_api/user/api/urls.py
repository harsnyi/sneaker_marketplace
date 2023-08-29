from django.urls import path
from . import views
from .views import MyTokenObtainParView,register_view

from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    path('',views.getRoutes),
    path('token/',MyTokenObtainParView.as_view(),name='token_obtain_pair'),
    path('token/refresh',TokenRefreshView.as_view(),name='token_refresh'),
    path('register/',register_view,name='registration'),

]