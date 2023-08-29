from user.models import User
from rest_framework import serializers

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password','last_name','first_name','email','phone_number','gender')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user