#!/bin/bash
pip install asgiref==3.7.2 
pip install Django==4.2.7 
pip install django-filter==23.3 
pip install djangorestframework==3.14.0 
pip install djangorestframework-simplejwt==5.3.0 
pip install Markdown==3.5.1 pip install Pillow==10.1.0 
pip install PyJWT==2.8.0 
pip install pytz==2023.3.post1 
pip install sqlparse==0.4.4 
pip install typing_extensions==4.8.0
pip install drf_yasg==1.21.7
poetry install
python3 manage.py makemigrations
python3 manage.py migrate
