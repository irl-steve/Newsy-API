//import express framwork
const express = require('express');
//sets up app as an express app
const app = express();
//the server will listen on port 3000, or a user defined port
const port = process.env.PORT || 3000;
//imports mongoos
const mongoose = require('mongoose');
//imports the bodyparse
const bodyParser = require('body-parser');
//imprts cors handling
const cors = require('cors')

//sets up database, pointing to file below
var dbConfig = require('C:/Users/Stephen/Documents/College Work/CS615/Project/config/database.config.js');

// parse requests of content-type - application/x-www-form-urlencoded, this means that we can send form data as a request
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json, this means that we can send json data as a request
app.use(bodyParser.json())

//lets mongoose use promises, that is an object that may produce a single value some time in the future : either a resolved value, or a reason that it's not resolved (e.g., a network error occurred)
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//sets up routes to the endpoints defined in file below
var routes = require('C:/Users/Stephen/Documents/College Work/CS615/Project/app/routes/channel.routes.js')(app);

//uses the imported cors module to handle cors erros if they occur
app.use(cors())

//sets up a general message that is printed when a 404 eroor occurs
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

//all other errors fall under this category, will return a 500 unless specified
//, also means that if none of the endpoints are reached, that is if an undefined HTTP request is received than an error will occur
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//sets up the server to listen on port
app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});
