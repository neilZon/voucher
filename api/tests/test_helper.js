
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
module.exports.removeOne = function(done){
    User.deleteMany({email:test_user.email}).then(done);
}