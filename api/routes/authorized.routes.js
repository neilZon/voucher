
//===================== authorized.routes.js ======================

const express = require('express');
const isAuth = require('../middleware/auth.middleware').isAuth;
const passport = require('passport');

var router = express.Router();

// ---------------------- user account ------------------------ 
router.get('/account', 
    passport.authenticate('jwt', {session:false}), 
    (req, res, next) => {
        res.send('you are viewing your account details')
    }
)

module.exports = router; 