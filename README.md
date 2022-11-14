# Table of contents
Prerequisites(#Prerequisites)
[Setup](#Setup)
    [GitHub](#Github)
    [Database](#Database)
    [Backend](#Backend)    
    [Frontend](#Frontend)
    [Users](#Users)
[Fixes](#Fixes)
[Additional Data](#Additional Data)
[Testing](#Testing)
    [Setup Postman](#Setup Postman)
    [Setup Cypress](#Setup Cypress)
    [Test Postman](#Test Postman)
    [Test Cypress](#Test Cypress)
[UML](#UML)
    [Domain Model](#Domain-Model)
    [ERD Diagram](#ERD-Diagram)
    [Use Case Diagram](#Use-Case-Diagram)
    [Sequence Diagram](#Sequence-Diagram)



# Prerequisites

## Docker
There are multiple prerequesites to be able to run this website locally. To run the database, you need to 
have a docker container running a **PostgreSQL Database** on port 5432. If you this container ist not yet running,
you can create one with the command that should be copy pasted into a command window:

`docker run --name postgres-db -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

## DBeaver
Therefore username and password are both postgres, to connect to your database with a database tool, e.g. **DBeaver**.

## IntelliJ
To run the backend portion, you need to have an appropriate IDE, preferebly **IntelliJ**, running the Java JDK Version 18.

## Visual Studio Code
To run the frontend part, you also need an appropriate code editor, e.g. **VSC** or **WebStorm**.


# Setup

## Github
Copy the ssh code on the website and clone the project onto your own computer via gitbash or the desktop app.

## Database
As mentioned prior, this project requires you to run a **PostgreSQL** Database that can be initialized via the link above.
To view changes it is adviced to use a Database editor program like **DBeaver** 

## Backend
Open the folder "backend" in **IntelliJ**. Build the project with gradle with the button or the shortcut "crtl+F9".
Reload all gradle projects to make sure that everything is set up correctly. Afterwards the programm can be run via "demo-Tasks-application-bootRun".
When starting the project for the first time, an error will be shown in your console, saying that certain relations do not exist.
This is an error in the backbone structure and cannot be averted. The backend portion is still set up correctly and after clicking "run" again,
you will see the correct messages in your console log.

## Frontend
Open the folder "Frontend" with **VSC**. Open a new terminal if none is open and type in `yarn install`. Type `yarn start` after installation is complete.

## Users
After setting up the application correctly and starting the frontend, you will be redirected to the landing page on `http://localhost:3000/` 
There, you can switch to the login window via the link on the screen. There are two users with usable roles and their credentials are:
**ADMIN**
email: **admin@example.com** \
password: **1234** \

**REGULAR USER**
email: **user@example.com** \
password: **1234**


# Fixes

- If something isn't working correctly, start by closing and reopening frontend, backend and database.
- If this didn't help try deleting and reinstalling your Docker container.


# Additional Data

More Data can be added via the file data.sql, located in the backend folder. If you decide to add more data this way, be sure to delete and reinstall
your docker container before running the program again.


# Testing

We chose two different methods to test the backend and frontend alike.
 
**Postman** was used to test our backend, while **Cypress** was used to test our frontend.
Since unit tests were not a top priority we focused on testing our endpoints, which can be done nicely with **Postman**.$
**Cypress** is a phenomenal tool to test use cases on your website. With **Cypress**, you can do multiple consecutive actions.

To run our test setup you have to do the following:

## Setup Postman
In the backend folder of this project is a folder `backend/src/test/postman` where both the collection and environment variables lie that
can be imported into your own Postman application.

## Setup Cypress
Within a terminal in the frontend portion, you can type in `yarn run cypress open` and then `yarn cypress run` to start using these tests.

## Test Postman
Our **Postman** tests are ordered in a way to show all endpoint functionalities after eachother. By right-clicking on your collection, you can run everything at once.

## Test Cypress
Our **Cypress* test covers a specific use case, that goes as followed:
- user logs in
- user sees no option to delete foreign posts
- user logs out
- admin logs in
- admin sees option to delete foreign posts
- admin deletes foreign post
- admin logs out

This test demonstrates that an admin has a specific homepage and in this page they are able to delete and change foreign posts

#UML

## Domain Model

<img src="IMG/domain_model.jpg" alt="Domain Model">

## ERD Diagram 

<img src="IMG/erd.png" alt="ERD">

## Use Case Diagram

<img src="IMG/use_case_diagram.jpg" alt="Use Case Diagram"

<img src="IMG/use_case_description.jpg" alt="Use Case Description">

## Sequence Diagram

<img src="IMG/sequence_diagram.jpg" alt="Sequence Diagram">




