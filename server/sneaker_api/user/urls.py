from django.urls import path
from . import views
from .views import MyTokenObtainParView,Update_access_token_view,Register_view,LogoutView

from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    
    path('token/',MyTokenObtainParView.as_view(),name='token_obtain_pair'),
    path('token/refresh',Update_access_token_view.as_view(),name='token_refresh'),
    path('register/',Register_view.as_view(),name='registration'),
    path('token/logout/',LogoutView.as_view(),name='logout'),

]