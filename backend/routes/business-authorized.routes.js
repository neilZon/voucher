//===================== business-authorized.routes.js ======================

const express = require('express');
const passport = require('passport');

const BusinessUser = require('../models/Business-Users.models')

var router = express.Router();

// ---------------------- business user account ------------------------ 
/* 
 * this route will show user information and
 * allow business users to manage packages
*/
router.get('/account',
   passport.authenticate('jwt-business', {session:false}), 
   (req, res, next) => {
      
      //TODO: should reveal business data
      res.send('you are viewing your business account details')
      next();
   }
);



module.exports = router; 