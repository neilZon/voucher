//=====================  server.js  ======================

const express = require('express'); 
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express(); // init express app

// LOAD VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//MIDDLEWARE
app.use(bodyParser.json())

//ROUTES
app.use('/', require('./routes/index'));

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true},() => {
    console.log('Connection success');
})

//START SERVER
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));