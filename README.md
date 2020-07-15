# DjangoReact- Moodle clone

This repository contains a learning management system project setup for Django and React. The project contains backend user authentication with the Django Rest Framework and rest-auth. The frontend has react redux setup for user authentication in the frontend.

## Backend development workflow

```json
virtualenv env
pip install -r requirements.txt
python manage.py runserver
```

## Frontend development workflow

```json
npm i
npm start
```

## For deploying

```json
npm run build
```
## This project use a custome user model
For add a user as an admin user:


```
python manage.py shell

>>>from users.models import User
>>>admin = User.objects.get(username=yourUserName)
>>>admin.is_superuser = True
>>>admin.is_staff = True
>>>admin.save()
>>>exit()

```