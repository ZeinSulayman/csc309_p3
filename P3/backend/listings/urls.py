from django.urls import path
from .views import PetListView, PetRetrieveUpdateDestroyView, PetCreateView, petRetrieveView

urlpatterns = [
    path('pets/', PetListView.as_view(), name='pet-list'),
    path('pets/newpet/', PetCreateView.as_view(), name='pet-create'),
    #path('pets/create/', PetCreateView.as_view(), name='pet-create'),
    path('pets/<int:pk>/', PetRetrieveUpdateDestroyView.as_view(), name='pet-retrieve-update-destroy'),
    path('pets/details/<int:pk>/', petRetrieveView.as_view(), name='pet-retrieve')
]
