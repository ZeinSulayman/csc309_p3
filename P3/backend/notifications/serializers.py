from rest_framework import serializers
from .models import Notification


class NotifSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    read = serializers.ReadOnlyField()
    class Meta:
        model = Notification
        fields = ('content','link','id', 'read')


class NotifEditSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = ('read',)
