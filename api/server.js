//=====================  server.js  ======================

const express = require('express'); // express app
const mongoose = require('mongoose');

const app = express();

//MIDDLEWARE
app.use('/login', (req, res, next) => {
    console.log("howdy");
    next();
})

//ROUTES
app.use('/', require('./routes/index'));

//CONNECT TO DB
mongoose.connect('mongodb+srv://voucher-user0:<password>@vouchercluster0-k7dyp.mongodb.net/test?retryWrites=true&w=majority', () => {
    console.log('Connection success');
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));