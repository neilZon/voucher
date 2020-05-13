//=====================  server.js  ======================

const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const uuid = require('uuid');
const session = require('express-session');
var expressValidator = require('express-validator');


require('dotenv/config');

const app = express(); // init express app

// LOAD VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//MIDDLEWARE
app.use(bodyParser.json());
app.use(flash());
app.use(session({
    secret: 'keyboard cat', //TODO: change this to a random string 
    resave: true,
    saveUninitialized: true
}));

// PASSPORT CONFIG  
require('./config/passport.config')(passport);

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/', require('./routes/authentication.routes')); // user registration and signup

//CONNECT TO MONGODB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true},() => {
    console.log('Connection success');
});

//START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports = app; // for testing