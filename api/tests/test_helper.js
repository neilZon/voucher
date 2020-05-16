
const User = require('../models/Users.models')

const test_user = {
    "username": "testUsername",
    "password": "testpassword123",
    "confirmPassword": "testpassword123",
    "email": "john@email.com",
    "firstname": "Johnny",
    "lastname": "Apple"
}

// make available to other files
module.exports.test_user = test_user;

// delete new user
module.exports.removeDummyData = function(done){
    User.deleteMany({email:test_user.email}).then(done);
}

module.exports.addDummyData = function(newUser){
    newUser = new User(newUser)
    newUser.save(function(err){
        if(err) return console.log(err);
    })
}