//=====================  Business-Users.models.js  ======================

const mongoose = require('mongoose');

// User schema
const BusinessUserSchema = mongoose.Schema({
   businessName:{
      type:String,
      required:true
   },
   address: {
      type: String,
      required:true
   },
   phoneNumber:{
      type:String,
      required:true,
      unique:true
   },
   email: {
      type: String,
      required:true,
      unique:true
   },
   hash: {
      type: String,
      required:true
   },
   affiliation:{
      type:String,
      required:true
   },
   firstname: {
      type: String,
      required:true
   },
   lastname: {
      type: String,
      required:true
   },
   type: {
      type:String,
      required:true,
      default:"business"
   }
   //TODO:add credit card token from Stripe
});

const BusinessUser = module.exports = mongoose.model('BusinessUser', BusinessUserSchema, 'business_users');