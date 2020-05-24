//===================== business-landing-page.routes.js ======================

const express = require('express');
const passport = require('passport');

var router = express.Router();

// ---------------------- user account ------------------------ 
/* 
 * this route will show user information and
<<<<<<< HEAD:backend/routes/business-landing-page.routes.js
 * allow business users to manage packages
*/
router.get('/', 
   passport.authenticate('jwt', {session:false}), 
   (req, res, next) => {
      
      //TODO: need to only allow business users 
=======
 * allow user to manage subscriptions
*/
router.get('/account', 
   passport.authenticate('jwt', {session:false}), 
   (req, res, next) => {
      
      //TODO: should reveal customers data
>>>>>>> 8db93700e31d2531a108151cfdc63468f7e9a9a4:backend/routes/authorized.routes.js
      res.send('you are viewing your account details')
   }
)


module.exports = router; 