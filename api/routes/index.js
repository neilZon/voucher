//=====================  index.js  ======================

const express = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator');

var router = express.Router();

// user model
let User = require('../models/Users');

//landing page
router.get('/', (req, res) => {
    res.send("voucher landing page");
});


//----------------- register page ----------------------
router.get('/register', (req, res) => {
    res.render('registration');
});

// registration request
router.post('/register', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const password2 = req.body.password2
    const email = req.body.email
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    
    // check for and validate required inputs
    check('username', 'Username is required').notEmpty();
    check('email', 'Email required').notEmpty();
    check('email', 'Invalid email').isEmail();
    check('password', 'password is required').notEmpty();
    check('password2', 'passwords do not match').equals(req.body.password);
    check('Firstname', 'First name is required').notEmpty();
    check('Lastname', 'Lastname is required').notEmpty();

    let errors = validationResult(req);
    
    if(errors){
        res.render('registration', {
            errors:errors
        });
    } else {
        let newUser = new User({
            username:username,
            password:password,
            email:email,
            firstname:firstname,
            lastname:lastname
        });
        console.log('hi');
        
        // hash password with salt
        bcrypt.genSalt(15, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(error){
                    console.log(err);
                }
                newUser.password = hash;
                
                // newUser.save((err) => {
                //     if(err){
                //         console.log(err);
                //         return
                //     } else {
                //         req.flash('success', 'You are now registered');
                //         res.redirect('/user/login');
                //     }
                // })
            });
        })
    }
});

//----------------------- login page -----------------------------
router.get('/login', (req, res) => {
    res.send("this is the login page");
});

// authentication
router.post('/login', (req, res) => {
    res.send("login authentication");
});

module.exports = router; 