# FYP Project for A3073-191 and A3072-191

## Description of project
It is a combined final year project between Joelle Kok (backend) and Celia Ong (frontend) to create a web-based project management platform for Nanyang Technological University (NTU) professors and students taking their FYPs or DIPs. This project requires MySQL, Django and NodeJS set up in your computer system.

## Install and Run
To install, please go into the instructions folder to read the document and follow on how to install. Similarly, to start the project, follow the same document.

## Folders
##### `backend`
This folder contains all the back-end codes. To run the backend, please start the env first then run manage.py runserver in fyp_dip_ms folder.
###### `backend` Folder Structure
```
.
+-- env
+-- fyp_dip_ms
    |
    +-- files folder (documents uploaded from the website)
    |
    +-- fyp_dip_ms folder
    |   |
    |   +-- settings.py (settings for the application)
    |   |
    |   +-- urls.py
    |   |
    |
    +-- tasklist folder
    |   |
    |   +-- api folder
    |   |   |
    |   |   +--serializers.py 
    |   |   |
    |   |   +--urls.py
    |   |   |
    |   |   +-- views.py
    |   |
    |   +-- admin.py (for registering the tables into the admin website)
    |   |   
    |   +-- models.py (reflecting the database tables)
    |   |
    +-- manage.py (to call manage.py commands)
```

##### `frontend`
This folder contains all front-end codes. To run the frontend, please `cd` into this folder and `npm start`. 

###### `frontend` Folder Structure
```
.
+-- components
    |
    +-- MainCalendarComponents folder
    |   |
    |   +-- MainCalendarReusableComponents folder
    |   |
    |   +-- StaffComponents folder
    |   |
    |   +-- StudentComponents folder
    |
    +-- ContentRouterComponents folder (includes components for Weekly Report, Final Report, Strategy Plan, Interim Report and Meeting Notes)
    |   |
    |   +-- ContentRouterReusableComponents folder
    |
    +-- AxiosCalling folder (includes all required axios calls)
```

##### instructions
This contains the instructions document to refer to when you need to install or run the project.

##### report
This contains our final year report in word document.
