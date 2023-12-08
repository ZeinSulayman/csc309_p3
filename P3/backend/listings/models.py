from django.db import models
#from ..accounts.models import User, PetShelter, PetSeeker


class Pet(models.Model):

    name = models.CharField(max_length=255)
    owner = models.ForeignKey("accounts.PetShelter", on_delete=models.CASCADE)
    breed = models.CharField(max_length=255)
    gender = models.CharField(max_length=255)
    age = models.IntegerField()
    size = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='available')
    pic = models.ImageField(upload_to='pet_pics/', blank=True, null=True)
    color = models.CharField(max_length=255)


    def __str__(self):
        return f"{self.name}'s listing"
