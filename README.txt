FriendLocator API

REST API for a location-sharing social media app using Node.JS and MongoDB

This API application was written using Node.JS and Express. Data is stored in a User model in MongoDB. 
To use this application, a local MongoDB and Node.JS client is required. 
First install NPM modules using 'npm install' command on the Node.JS command line.
Using the MongoDB client, create a database to use and connect to the database. 
Then navigate to config/config.js and enter database name in the connection string for your local database. 
Start the Express server using 'node server.js'.

# API Documentation

Responses with status code 200 will have data sent in JSON format

POST /registration

parameter name: firstName,
Required: No,
Description: First name of registering user

parameter name: lastName,
Required: No,
Description: Last name of registering user

parameter name: username,
Required: Yes,
Description: Requesting username of registering user

parameter name: password,
Required: Yes,
Description: Password for registering user

