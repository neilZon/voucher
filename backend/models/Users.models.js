//=====================  Users.js  ======================

const mongoose = require('mongoose');

// User schema
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required:true,
        unique:true
    },
    hash: {
        type: String,
        required:true
    },
    firstname: {
        type: String,
        required:true
    },
    type: {
        type: String,
        required: true,
        default: "customer"
    }
    //TODO: add credit card token property from Stripe
});

const User = module.exports = mongoose.model('User', UserSchema, 'users');