from django.urls import path
from . import views
from .views import(
    Update_access_token_view,
    Register_view,LogoutView,
    Authentication_view,
    CheckAccessToken
)

urlpatterns = [
    
    path('token/refresh',Update_access_token_view.as_view(),name='token_refresh'),
    path('registration',Register_view.as_view(),name='registration'),
    path('token/logout',LogoutView.as_view(),name='logout'),
    path('token/authenticate',Authentication_view.as_view(),name='authenticate'),
    path('token/check_access_token',CheckAccessToken.as_view(),name='check_access_token')
]
