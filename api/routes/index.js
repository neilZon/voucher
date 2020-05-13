//=====================  index.js  ======================

const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator');


var router = express.Router();

// user model
let User = require('../models/Users');

//landing page
router.get('/', (req, res) => {
    // console.log(req.sessionID)
    res.send("voucher landing page");
});


//----------------- register page ----------------------
router.get('/register', (req, res) => {
    res.render('registration');
});

// registration request
router.post('/register',[
        // check for and validate required inputs
        check('username', 'Username is required').notEmpty().withMessage('username is required'),
        check('email', 'Email required').notEmpty(),
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is required').notEmpty(),
        check('confirmPassword', 'Passwords do not match').notEmpty().custom((value, { req }) => value === req.body.password),
        check('firstname', 'Firstname is required').notEmpty(),
        check('lastname', 'Lastname is required').notEmpty()
    ], (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    let errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).json(errors.array());
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
                
                // save password to MongoDB
                newUser.save((err) => {
                    if(err){
                        console.log(err);
                        res.send({error:err});
                    } else {
                        req.flash('success', 'You are now registered');
                        res.redirect('/login');
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
        failureFlash: true
    }, 
    function(){
        console.log('authentication successful');
        res.send("authentication success");
    })(req,res,next);
});

module.exports = router; 