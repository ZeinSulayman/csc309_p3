from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, PetShelter, PetSeeker\
#, Application
#admin.site.register(PetSeeker)
admin.site.register(User)
admin.site.register(PetSeeker)
admin.site.register(PetShelter)
#admin.site.register(Application)
