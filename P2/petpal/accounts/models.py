from django.db import models
from django.contrib.auth.models import User, AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_pet_shelter = models.BooleanField(default=False)
    is_pet_seeker = models.BooleanField(default=False)

    # Add a unique related_name for the groups field
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_set_custom',
        related_query_name='user_custom',
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )

    # Add a unique related_name for the user_permissions field
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_permissions_custom',
        related_query_name='user_permissions_custom',
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    def __str__(self):
        return self.username

class PetShelter(models.Model):
    user = models.OneToOneField(
        'User', on_delete=models.CASCADE, related_name='pet_shelter'
    )
    shelter_id = models.AutoField(primary_key=True)
    shelter_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    phone_num = models.CharField(max_length=255)
    website = models.CharField(max_length=255)
    description = models.TextField()
    pic = models.ImageField(upload_to='pics/', blank=True, null=True)
    # notifications = models.ManyToManyField()
    # pets = models.ManyToManyField()

    def __str__(self):
        return f"{self.user.username}'s PetShelter Profile"

class PetSeeker(models.Model):
    user = models.OneToOneField(
        'User', on_delete=models.CASCADE, primary_key=True, related_name='pet_seeker'
    )
    location = models.CharField(max_length=255)
    bio = models.TextField()
    phone_num = models.CharField(max_length=255, null=True)
    pref = models.TextField(null=True)
    pic = models.ImageField(upload_to='pics/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s PetSeeker Profile"

"""
class Application(models.Model):
    content = models.TextField()
    user = models.OneToOneField(
        'User', on_delete=models.CASCADE, primary_key=True, related_name='app'
    )"""