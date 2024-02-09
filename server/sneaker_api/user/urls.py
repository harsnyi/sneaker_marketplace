from django.urls import path
from .views import(
    UpdateAccessTokenView,
    RegisterView,
    LogoutView,
    AuthenticationView,
    CheckAccessToken,
    ListUsers,
    UploadProfilePicture,
    GetProfileData,
    GetProfilePicture
)

urlpatterns = [
    
    path('token/refresh',UpdateAccessTokenView.as_view(),name='token_refresh'),
    path('registration',RegisterView.as_view(),name='registration'),
    path('token/logout',LogoutView.as_view(),name='logout'),
    path('token/authenticate',AuthenticationView.as_view(),name='authenticate'),
    path('token/check_access_token',CheckAccessToken.as_view(),name='check_access_token'),
    path('list_users',ListUsers.as_view(),name='list_users'),
    path('upload_profile_picture',UploadProfilePicture.as_view(),name='upload_profile_picture'),
    path('get_profile_picture',GetProfilePicture.as_view(),name='get_profile_picture'),
    path('get_profile_data/<str:username>',GetProfileData.as_view(),name='get_profile_data')
]
