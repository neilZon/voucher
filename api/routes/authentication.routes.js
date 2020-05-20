//=====================  authentication.routes.js  ======================

const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const validator = require('validator');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const utils = require('../utils/jwt.utils');

var router = express.Router();

// user model
let User = require('../models/Users.models');

//landing page
router.get('/', (req, res) => {
    res.send("voucher landing page");
});


//----------------- register page ----------------------
router.get('/register', (req, res) => {
    res.render('registration');
});

// registration request
router.post('/register',
    [
        // check for and validate required inputs
        check('email', 'Email required').notEmpty(),
        check('email', 'Invalid email').isEmail().custom((value, {req}) => validator.isEmail(req.body.email)),
        check('password', 'Password must be at least 6 characters').isLength({min:6}),
        check('password', 'Password is required').notEmpty(),
        check('confirmPassword', 'Passwords do not match').notEmpty().custom((value, { req }) => value === req.body.password),
        check('firstname', 'Firstname is required').notEmpty(),
    ],
    (req, res, next) => {
        const password = req.body.password;
        const email = req.body.email;
        const firstname = req.body.firstname;

        let errors = validationResult(req);
        
        // see if any errors were raised
        if(!errors.isEmpty()){
            return res.status(422).json(errors.array());
        } else {
            
            
            // hash password with salt
            bcrypt.genSalt(15, (err, salt) => { 
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err){
                        console.log(err);
                    }

                    let newUser = new User({
                        email:email,
                        hash:hash,
                        firstname:firstname,
                    });
                    
                    // save password to MongoDB
                    newUser.save((err) => {

                        if(err){
                            // check for duplicate email
                            if(err.name === 'MongoError' && err.code === 11000){
                                let duplicatedField = (Object.keys(err.keyValue));
                                res.status(409);
                                res.send({msg:duplicatedField + " already exists" , keyValue:err.keyValue});
                            } else {
                                res.send(err);
                            }

                        // successful save
                        } else {
                            const jwt = utils.issueJWT(newUser);
                            res.json({success:true, user:newUser, token:jwt.token, expiresIn: jwt.expires});
                            
                        }
                    })
                });
            })
        }
    }
);

//----------------------- login page -----------------------------
router.get('/login', (req, res) => {
    res.render('login');
});

// authentication
router.post('/login', (req, res, next) => {

    User.findOne({email:req.body.email}, 
        
        function(err, user){

            if(err){ 
                return res.send(err)
            } 
            
            // email doesn't exist
            if(!user || user === null ){
                return res.status(401).json({success:false, msg:"no user with that email"})
            }

            // compare hashed passwords
            bcrypt.compare(req.body.password, user.hash, (err, isMatch) => {
                if(err) throw err;
                
                // good login
                if(isMatch){
                    const tokenObj = utils.issueJWT(user);
                    return res.status(200)
                        .json({
                            success:true, 
                            token:tokenObj.token, 
                            expiresIn:tokenObj.expires
                        });
                } 
                
                // bad login
                else {
                    return res.status(401).json({success:false, msg:'wrong password'});
                }
            }); 
        }
    ).catch(err => {console.log(err)});
});

module.exports = router; 