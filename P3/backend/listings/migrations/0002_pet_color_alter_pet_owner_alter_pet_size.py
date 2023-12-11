# Generated by Django 4.2.7 on 2023-12-10 05:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('listings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pet',
            name='color',
            field=models.CharField(default='red', max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='pet',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.petshelter'),
        ),
        migrations.AlterField(
            model_name='pet',
            name='size',
            field=models.CharField(max_length=255),
        ),
    ]
