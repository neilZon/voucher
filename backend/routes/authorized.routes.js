//===================== authorized.routes.js ======================

const express = require('express');
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("../models/Users.models");

var router = express.Router();

// ---------------------- user account ------------------------ 
/* 
 * this route will show user information and
 * allow user to manage subscriptions
*/
router.get('/account',
   (req, res, next) => {
      passport.authenticate('jwt-customer', {session:false}, (err, user, info) => {
         console.log("fjklds;fa");
         next()
      }), (req, res, next)=>{
         console.log("jkl;fsdfsl;");
         next()
      }
   }
);


module.exports = router; 