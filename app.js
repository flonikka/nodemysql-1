const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;


// const {getUsers} = require('./database.js');
//Parsing middleware configuration
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

//Static files
app.use(express.static('public'));

//Templating Engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

const routes = require('./server/routes/user');
app.use('/', routes);

// const routes = require('./server/routes/contactsRoute');
// app.use("/contacts", routes);

app.listen(port,() => 
    console.log(`Listening on port ${port}`));



