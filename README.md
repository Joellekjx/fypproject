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
the files that are mostly untouched are not specified
.
+-- env
|
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
|
+-- App.js (all routes are placed in here)
|
+-- SpecialRoutes.js (conditionals on routes are in here)
|
+-- components
|   |
|   +-- MainCalendarComponents folder
|   |   |
|   |   +-- MainCalendarReusableComponents folder
|   |   |
|   |   +-- StaffComponents folder
|   |   |
|   |   +-- StudentComponents folder
|   |
|   +-- ContentRouterComponents folder (includes components for Weekly Report, Final Report, Strategy Plan, Interim Report and Meeting Notes)
|   |   |
|   |   +-- ContentRouterReusableComponents folder
|   |
|   +-- AxiosCalling folder (includes all required axios calls)
|
+-- mobx-store (this is the MobX store)
|   |
|   +-- CalendarStore.js (this store is the main state management across most components)
|
+-- login-store (this is the Redux store mainly for login and logout functionalities)

```

##### instructions
This contains the instructions document to refer to when you need to install or run the project.

##### report
This contains our final year report in word document.

##### mock-data
This file contains the mock data in .sql if you'd like to have the database set up prior to running the project.