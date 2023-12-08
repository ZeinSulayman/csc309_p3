from rest_framework import permissions
from listings.models import Pet
from accounts.models import PetShelter


class IsShelter(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_pet_shelter


class IsShelterOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        pet_id = view.kwargs.get('pk')
        pet_instance = Pet.objects.get(id=pet_id)
        user = request.user
        return hasattr(user, 'pet_shelter') and PetShelter.objects.get(shelter_id=user.shelter_id()) == pet_instance.owner
        #return hasattr(user, 'pet_shelter') and user.pet_shelter.shelter_id == pet_instance.owner
