
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
   passport.authenticate('jwt', {session:false}), 
   (req, res, next) => {
      
      //TODO: should reveal customers data
      res.send('you are viewing your account details')
   }
)


module.exports = router; 