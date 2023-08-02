from django.urls import path, include
from user.views import HelloView

urlpatterns = [
    path('helloWorld', HelloView.as_view()),
]