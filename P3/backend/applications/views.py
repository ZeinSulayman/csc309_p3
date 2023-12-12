from django.utils import timezone
from rest_framework.permissions import IsAuthenticated

from .serializers import PetApplicationSerializer, PetApplicationDetailSerializer, \
    PetApplicationShelterUpdateSerializer, PetApplicationSeekerUpdateSerializer
from django.shortcuts import get_object_or_404
from .models import PetApplication
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsShelter, IsPetSeeker
from rest_framework.pagination import PageNumberPagination
from listings.models import Pet
from accounts.models import PetShelter, PetSeeker


class ShelterApplicationsListView(ListAPIView):
    serializer_class = PetApplicationSerializer

    def get_queryset(self):
        # Retrieve query parameters for status filtering, sorting, and pagination
        status_filter = self.request.query_params.get('status', None)
        pet_filter = self.request.query_params.get('pet', None)
        sort_by = self.request.query_params.get('sort', None)


        # Apply status filter if provided
        if self.request.user.is_pet_shelter:
            queryset = PetApplication.objects.filter(pet__owner=PetShelter.objects.get(shelter_id=self.request.user.shelter_id()))
        else:
            queryset = PetApplication.objects.filter(applicant=self.request.user)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if pet_filter:
            queryset = queryset.filter(pet=pet_filter)
        queryset = queryset.order_by('-date_created')
        # Apply sorting if provided
        if sort_by:
            print("sort is" + str(sort_by))
            if sort_by == 'date_created':
                queryset = queryset.order_by('date_created')
            elif sort_by == 'last_modified':
                queryset = queryset.order_by('-last_modified')
            for box in queryset:
                print("box: " + str(box.date_created))

        return queryset

    def list(self, request, *args, **kwargs):
        # Apply pagination
        paginator = PageNumberPagination()
        applications = self.get_queryset()
        result_page = paginator.paginate_queryset(applications, request)

        serializer = PetApplicationDetailSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)


class PetApplicationUpdateView(CreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, application_id):
        return get_object_or_404(PetApplication, pk=application_id)

    def get_serializer_class(self):
        # Determine the user type and return the appropriate serializer class
        if self.request.user.is_pet_shelter:
            return PetApplicationShelterUpdateSerializer
        elif self.request.user.is_pet_seeker:
            return PetApplicationSeekerUpdateSerializer
        # Add more cases for other user types if needed
        else:
            # Use a default serializer class or raise an exception
            return PetApplicationShelterUpdateSerializer

    def create(self, request, application_id, *args, **kwargs):
        application = self.get_object(application_id)

        # Check if the user has permission to update the application
        if (request.user.is_pet_shelter and
            application.status == "pending" and
            request.data.get('status') in ["accepted", "denied"]) or \
                (request.user.is_pet_seeker and
                 application.status in ["pending", "accepted"] and
                 request.data.get('status') == "withdrawn"):
            # Get the appropriate serializer class based on user type
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(application, data=request.data)

            if serializer.is_valid():
                application.last_modified = timezone.now()
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Permission denied'}, status=status.HTTP_403_FORBIDDEN)


class PetApplicationDetailView(APIView):
    permission_classes = [IsShelter | IsPetSeeker]

    def get(self, request, application_id):
        if request.user.is_pet_seeker:
            application = get_object_or_404(PetApplication, pk=application_id, applicant=request.user)
        else:
            application = get_object_or_404(PetApplication, pk=application_id,
                                            pet__owner=PetShelter.objects.get(shelter_id=request.user.shelter_id()))
        serializer = PetApplicationDetailSerializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PetApplicationView(CreateAPIView):
    serializer_class = PetApplicationSerializer
    permission_classes = [IsAuthenticated, IsPetSeeker]

    def create(self, request, *args, **kwargs):
        pet_id = self.kwargs.get('pet_id')
        pet = Pet.objects.get(pk=pet_id)
        pet_name = pet.name

        # Check if the pet is available for adoption
        if not pet.status == 'available':
            return Response({'error': 'Pet is not available for adoption.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer, pet)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, pet):
        # Check if there are any existing applications for the same pet by the same user
        existing_applications = PetApplication.objects.filter(
            pet=pet, applicant=self.request.user
        )

        if existing_applications.exists():
            # There are existing applications
            # Check if all previous applications have status 'withdrawn'
            if existing_applications.filter(status='withdrawn').count() == existing_applications.count():
                # All previous applications have status 'withdrawn'
                # Proceed with creating the new application
                serializer.save(
                    pet=pet,
                    applicant=self.request.user,
                    status="pending",
                    pet_name=pet.name,
                    pet_pic=pet.pic,
                    shelter_name=pet.owner.shelter_name,
                )
            else:
                # There are applications with statuses other than 'withdrawn'
                return Response(
                    {"error": "You can only apply if all previous applications for this pet were withdrawn."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            # No existing applications for the same pet by the same user
            # Proceed with creating the new application
            serializer.save(
                pet=pet,
                applicant=self.request.user,
                status="pending",
                pet_name=pet.name,
                pet_pic=pet.pic,
                shelter_name=pet.owner.shelter_name,
            )
