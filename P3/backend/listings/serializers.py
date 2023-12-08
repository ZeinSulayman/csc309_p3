from rest_framework import serializers
from .models import Pet


class PetListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pet
        fields = ('id', 'owner', 'name', 'breed', 'gender', 'age', 'size', 'description', 'location', 'status', 'pic', 'color')


class PetCreateSerializer(serializers.ModelSerializer):
    GENDER_CHOICES = [('male', 'Male'), ('female', 'Female')]
    SIZE_CHOICES = [('small', 'Small'), ('medium', 'Medium'), ('large', 'Large')]
    size = serializers.ChoiceField(choices=SIZE_CHOICES)
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    class Meta:
        model = Pet
        exclude = ('owner', 'status')


class PetEditSerializer(serializers.ModelSerializer):
    STATUS_CHOICES = [('available', 'Available'), ('adopted', 'Adopted'), ('pending', 'Pending'), ('withdrawn', 'Withdrawn')]
    GENDER_CHOICES = [('male', 'Male'), ('female', 'Female')]
    SIZE_CHOICES = [('small', 'Small'), ('medium', 'Medium'), ('large', 'Large')]
    size = serializers.ChoiceField(choices=SIZE_CHOICES)
    status = serializers.ChoiceField(choices=STATUS_CHOICES)
    gender = serializers.ChoiceField(choices=GENDER_CHOICES)
    class Meta:
        model = Pet
        exclude = ('owner',)

class PetRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ('id', 'owner', 'name', 'breed', 'gender', 'age', 'size', 'description', 'location', 'status', 'pic', 'color')
