# Generated by Django 4.2.7 on 2023-12-10 05:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sheltercomments',
            name='name',
            field=models.CharField(default='test', max_length=255),
            preserve_default=False,
        ),
    ]