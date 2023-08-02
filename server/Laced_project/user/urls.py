from django.urls import path, include
from user.views import HelloView, register_view, login_view, secured_endpoint
from . import views

urlpatterns = [
    path('helloWorld', HelloView.as_view()),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('secured/', secured_endpoint, name='secured_endpoint'),

]