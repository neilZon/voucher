//=====================  passport.js  ======================

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');

const pathToPubKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToPubKey, 'utf8');

const User = require('../models/Users.models');
const BusinessUser = require('../models/Business-Users.models');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };

module.exports = function(passport){
    passport.use(new JwtStrategy(options,async function(jwt_payload, done){

        try {
            let user = null
    
            // query user based on role 
            if(jwt_payload.type === "customer"){
                user = await User.findOne({_id:jwt_payload.sub});
            }
    
            if(jwt_payload.type === "business"){
                user = await BusinessUser.findOne({_id:jwt_payload.sub});
            }
    
            // no user
            if(!user){
                return done(null, false);
            }
    
            // found user
            return done(null, user);

        } catch(err) {
            return done(err, false);
        }
    }))

    // module.exports = function(passport){
    //     // local strategy 
    //     passport.use(new LocalStrategy(customFields,
    //         (email, password, done) => {
                
    //             // match the username
    //             let query = {email:email};
    //             User.findOne(query, (err, user) => {
    //                 if(err) throw err;
        
    //                 // no user 
    //                 if(!user){
    //                     return done(null, false, {message: 'no user found'});
    //                 }
        
    //                 // match password
    //                 bcrypt.compare(password, user.password, (err, isMatch) => {
    //                     if(err) throw err;
    //                     if(isMatch){
    //                         return done(null, user);
    //                     } else {
    //                         return done(null, false, {message: 'wrong password'});
    //                     }
    //                 });
    //             });
    //     }));
    // }

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

}