//===================== business-landing-page.routes.js ======================

const express = require('express');
const passport = require('passport');

var router = express.Router();

// ---------------------- user account ------------------------ 
/* 
 * this route will show user information and
 * allow business users to manage packages
*/
router.get('/', 
   passport.authenticate('jwt', {session:false}), 
   (req, res, next) => {
      
      //TODO: need to only allow business users 
      res.send('you are viewing your account details')
   }
)


module.exports = router; 