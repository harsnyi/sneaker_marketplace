from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from ..models import Address
import logging
from rest_framework.permissions import IsAuthenticated

from ..serializer import (
    AddNewAddressSerializer,
    AddressSerializer
)

logging.basicConfig(
    format='%(levelname)s - %(asctime)s - %(message)s',
    level=logging.INFO
)

class AddNewAddress(APIView):
    """The user can add a new address for him/herself"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request, *args, **kwargs):
        try:
            user = request.user
            if user.address_count < 5:
                serializer = AddNewAddressSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.validated_data['user'] = user
                    serializer.save()
                    user.address_count += 1
                    user.save()
                    return Response({'message': 'Sikeres feltöltés.'}, status=status.HTTP_200_OK)
                
                return Response({'message': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response({'message': 'Egy felhasználónak maximum 5 címe lehet.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        
        except Exception as error:
            return Response({'message': 'Hiba új cím hozzáadása közben.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAllAddresses(APIView):
    """Returns the addresses associated with the user"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        try:
            user = request.user
            addresses = Address.objects.filter(user = user)
            serializer = AddressSerializer(addresses,many=True)
            return Response({'message': serializer.data}, status=status.HTTP_200_OK)
        
        except Exception as error:
            return Response({'message': 'Hiba a cím lekérése közben.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetAddress(APIView):
    """Returns the specific address associated with the user"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id, *args, **kwargs):
        try:
            user = request.user
            try:
                address = Address.objects.get(id=id, user=user)
            except Exception as error:
                return Response({'message': 'A cím nem található.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            serializer = AddressSerializer(address)
            return Response({'message': serializer.data}, status=status.HTTP_200_OK)
        
        except Exception as error:
            return Response({'message': 'Hiba a cím lekérése közben.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateAddress(APIView):
    """Returns the specific address associated with the user"""
    permission_classes = [IsAuthenticated]
    
    def put(self, request, id, *args, **kwargs):
        user = request.user
        try:
            address = Address.objects.get(id=id, user=user)
        
        except Exception as error:
            return Response({'message': 'A cím nem található.', 'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        serializer = AddNewAddressSerializer(data=request.data)
        if serializer.is_valid():
            
            address.name = serializer.validated_data['name']
            address.country = serializer.validated_data['country']
            address.city = serializer.validated_data['city']
            address.zip = serializer.validated_data['zip']
            address.street = serializer.validated_data['street']
            address.is_default = serializer.validated_data['is_default']
            
            address.save()
            return Response({'message': 'Cím sikeresen módosítva.'}, status=status.HTTP_200_OK)
        return Response({'message': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class DeleteAddress(APIView):
    """Deletes the clicked address"""
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, id, *args, **kwargs):
        user = request.user
        try:
            address = Address.objects.get(id=id, user=user)
        
        except Exception as error:
            return Response({'message': 'A cím nem található.','error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        address.delete()
        user.address_count -= 1
        user.save()
        return Response({'message': 'Cím sikeresen törölve.'}, status=status.HTTP_200_OK)
