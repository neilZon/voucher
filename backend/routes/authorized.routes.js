
//===================== business-landing-page.routes.js ======================

const express = require('express');
const passport = require('passport');

var router = express.Router();

// ---------------------- user account ------------------------ 
/* 
 * this route will show user information and
 * allow user to manage subscriptions
*/
router.get('/account', 
   passport.authenticate('jwt-customer', {session:false}), 
   (req, res, next) => {
      
      // TODO: Also send credit card Stripe token
      console.log(req.user);
      res.json({firstname:req.user.firstname, email:req.user.email});
   }
)


module.exports = router; 