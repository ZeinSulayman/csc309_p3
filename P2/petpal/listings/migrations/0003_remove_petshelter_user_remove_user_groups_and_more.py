# Generated by Django 4.2.7 on 2023-11-13 20:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('listings', '0002_pet_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='petshelter',
            name='user',
        ),
        migrations.RemoveField(
            model_name='user',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_permissions',
        ),
        migrations.AddField(
            model_name='pet',
            name='id',
            field=models.BigAutoField(auto_created=True, default='1', primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pet',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='PetSeeker',
        ),
        migrations.DeleteModel(
            name='PetShelter',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
