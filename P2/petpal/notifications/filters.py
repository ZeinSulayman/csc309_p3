import django_filters
from .models import Notification

class NotificationFilter(django_filters.FilterSet):
    class Meta:
        model = Notification
        fields = {
            'read': ['exact']
        }
