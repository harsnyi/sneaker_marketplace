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
    GetProfilePicture,
    GetUserData,
    UpdateUserData,
    AddNewAddress,
    GetAllAddresses,
    GetAddress,
    DeleteAddress
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
    path('get_profile_data/<str:username>',GetProfileData.as_view(),name='get_profile_data'),
    path('get_user_data',GetUserData.as_view(),name='get_user_data'),
    path('update_user_data', UpdateUserData.as_view(), name='update_user_data'),
    path('add_address',AddNewAddress.as_view(),name='add_address'),
    path('get_addresses',GetAllAddresses.as_view(),name='get_all_address'),
    path('get_address/<int:id>',GetAddress.as_view(),name='get_address'),
    path('delete_address/<int:id>',DeleteAddress.as_view(),name='delete_address'),
]
