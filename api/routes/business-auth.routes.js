//===================== business.routes.js ======================

const express = require('express');
const passport = require('passport');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const utils = require('../utils/jwt.utils');

var router = express.Router();

// business user model
let BusinessUser = require('../models/Business-Users.models');

//----------------- business landing page ----------------------
router.get('/', (req, res, next) => {
   res.send(res.sendFile(path.join(__dirname)));
})

//----------------- business registration page ----------------------
router.get('/register', (req, res, next) => {
   res.send("welcome to the business registration page");
});

router.post('/register',
   [
      // check for and validate required inputs
      check('businessName', 'Business name required').notEmpty(),
      check('address', 'Address name required').notEmpty(),
      check('phoneNumber', 'Phone number required').notEmpty(),
      check('phoneNumber', 'Not a phone number').isMobilePhone('any'),
      check('email', 'Email required').notEmpty(),
      check('email', 'Not a valid email').custom((value, {req}) => validator.isEmail(req.body.email)),
      check('password', 'Password required').notEmpty(),
      check('password', 'Password must be at least 6 characters').isLength({min:6}),
      check('confirmPassword', 'Passwords do not match').notEmpty().custom((value, {req}) => value === req.body.password),
      check('affiliation', 'Affiliation required').notEmpty(),
      check('firstname', 'Firstname required').notEmpty(),
      check('lastname', 'Lastname required').notEmpty()
   ],
   (req, res, next) => {
      const businessName = req.body.businessName;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
      const email = req.body.email;
      const password = req.body.password;
      const affiliation = req.body.affiliation;
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;

      let errors = validationResult(req);

      // see if any errors were raised
      if(!errors.isEmpty()){
         return res.status(422).json(errors.array());

      } else {
         bcrypt.genSalt(15, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
               if(err){
                  console.log(err);
               }

               let newBusinessUser = new BusinessUser({
                  businessName:businessName,
                  address:address,
                  phoneNumber:phoneNumber,
                  email:email,
                  affiliation:affiliation,
                  hash:hash,
                  firstname:firstname,
                  lastname:lastname
               })

               // save user
               newBusinessUser.save((err) => {
                  if(err){
                     
                     // check for duplicated email
                     if(err.name === 'MongoError' && err.code === 11000){
                        let duplicatedField = (Object.keys(err.keyValue));
                        res.status(409);
                        res.send({msg:duplicatedField + " already exists", keyValue:err.keyValue});
                     
                     } else {
                        res.send(err);
                     }
                     
                  } else {
                     const jwt = utils.issueJWT(newBusinessUser);
                     res.json({success:true, user:newBusinessUser, token:jwt.token, expiresIn:jwt.expires});
                  }
               })
            })
         })
      }
   }
);

//----------------- business login page ----------------------
router.get('/login', (req, res, next) => {
   res.send("welcome to the business login page");
});

router.post('/login', (req, res, next) => {
   BusinessUser.findOne({email:req.body.email},
      
      function(err, businessUser){
         if(err){ 
            return res.send(err)
         } 
         
         // email doesn't exist
         if(!businessUser || businessUser === null ){
            return res.status(401).json({success:false, msg:"no business user with that email"})
         }

         // compare hashed passwords
         bcrypt.compare(req.body.password, businessUser.hash, (err, isMatch) => {
            if(err) throw err;
            
            // good login
            if(isMatch){
               const tokenObj = utils.issueJWT(businessUser);
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
   )
});

module.exports = router; 