# chirp-express-theSql-CRUD# Lab 12: Chirp Express: The SeQueL - Continuation (CRUD)

##### Covalence

## Info

* In the first iteration of this lab, you created a database with a table for chirps

* In this lab, you will be writing stored procedures and API endpoints in Express to make our app fully CRUD-worthy

* You can use MySQL Workbench to complete this lab (in fact I recommend it)

## Getting Started

* Copy your package.json, client, and server folders over to this project from lab 10

* You can delete data.json from the server folder

* Will no longer be storing/reading to data.json

* Instead, we are going to use the database

* Still statically serving the `client` directory (index.html, script.js, etc.)

* You will need to run `npm install` again

* `nodemon` should still start your server when you get it up and running

## Objectives

* Add stored procedures to your database for getting all chirps, getting a single chirp, inserting a chirp, updating a chirp, and deleting a chirp. See detailed request outlines below.

* Add the appropriate routes to your express server to receive the various RESTful requests to kick off the above actions

* In those route handlers, communicate with the database server using the mysql node module

* In particular, your server should perform in the following manner

* When all chirps are requested:

* Should call the procedure to get all chirps, and should respond with them

* When one chirp is requested:

* Should call the procedure to get a single chirp and respond with it

* When a chirp should be created:

* Should call the procedure to insert a chirp and respond with the auto-gen id of the created chirp

* In the stored procedure, the timestamp should be set to NOW()

* This means that you will no longer set the timestamp on the front-end

* Status code should be 201

* When a chirp should be updated

* Should call the procedure to update an existing chirp

* Only the message can be updated

* Should just respond with code 204

* When a chirp should be deleted

* Should call the procedure to delete an existing chirp

* Should just respond with code 204

## Front-End Modifications

* Add a delete button/icon to each chirp in the list on the page. Clicking the button/icon should delete the chirp from the database and reload the list of chirps

* At this time, we will not be showing a visual means of viewing a single chirp or updating a chirp

* Will be added when we get to Angular!

## Tips / Hints

* We will no longer be using data.json anymore!

* You will find Express route parameters useful (see Express slides)

* You will find the body-parser useful (see Express slides)

## Go the Extra Mile

* Finished early? Want to expand your skills?

* Try consolidating all the Promise functions that call your stored procedures into a single function that takes a procedure name and an

array of arguments as the parameters.

* Hint: You can write code that will add the ?,?,?,?.... when it is necessary
