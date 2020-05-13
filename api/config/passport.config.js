//=====================  passport.js  ======================

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users.models');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    // local strategy 
    passport.use(new LocalStrategy((username, password, done) => {
        
        // match the username
        let query = {username:username};
        User.findOne(query, (err, user) => {
            if(err) throw err;

            // no user 
            if(!user){
                return done(null, false, {message: 'no user found'});
            }

            // match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'wrong password'});
                }
            });

        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}