//=====================  index.js  ======================

const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
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
    
    if(!errors.isEmpty()){
        res.render('registration', {
            errors:errors.array()
        });
    } else {
        let newUser = new User({
            username:username,
            password:password,
            email:email,
            firstname:firstname,
            lastname:lastname
        });
        
        // hash password with salt
        bcrypt.genSalt(15, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err){
                    console.log(err);
                }
                newUser.password = hash;
                
                console.log(newUser);
                
                newUser.save((err) => {
                    if(err){
                        console.log(err);
                        return;

                    } else {
                        //req.flash('success', 'You are now registered');
                        res.redirect('/login');
                        console.log("sucessfully signed up");
                    }
                })
            });
        })
    }
});

//----------------------- login page -----------------------------
router.get('/login', (req, res) => {
    res.render('login');
});

// authentication
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { 
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
});

module.exports = router; 