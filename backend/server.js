//=====================  server.js  ======================

const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

// ACCESS TO .env VARIABLES
require('dotenv').config();

// INIT EXPRESS APP
const app = express(); 

//CONNECT TO MONGODB
mongoose.connect(process.env.DB_CONNECTION, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    function(){
    console.log('Connection success');
});

// LOAD VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(flash());
app.use(session({
    secret: 'keyboard cat', //TODO: change this to a random string
    resave: true,
    saveUninitialized: true
}));

// ALLOW ANGULAR APP TO MAKE HTTP REQUESTS TO EXPRESS APP
app.use(cors());

// WHERE ANGULAR BUILDS TO
//app.use(express.static(path.join(__dirname, '../frontend/src')));

// PASSPORT CONFIG  
require('./config/passport.config')(passport);

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

//ROUTES
app.use('/', require('./routes/landing-page.routes'))
app.use('/', require('./routes/authentication.routes')); // user registration and signup 
app.use('/', require('./routes/authorized.routes')); // user account and details
app.use('/', require('./routes/business-landing-page.routes'))
app.use('/business', require('./routes/business-authentication.routes')); // business user routes 
app.use('/business', require('./routes/business-authorized.routes'));

//START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports = app; // for testing