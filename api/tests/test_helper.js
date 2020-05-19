//=====================  test_helper.js  ======================

const User = require('../models/Users.models')

const test_user = {
    email: "john@email.com",
    password: "testpassword123",
    confirmPassword: "testpassword123",
    firstname: "Johnny"
}

const test_data = {
    email: "john@email.com",
    hash: "testpassword123",
    firstname: "Johnny"
}

// make available to other files
module.exports.test_user = test_user;
module.exports.test_data = test_data;

// add dummy user 
module.exports.addDummyData = async function(userObj){
    newUser = new User(userObj)
    await newUser.save(function(err){
        if(err) return console.log('err');
    })
}

// delete dummy user
module.exports.removeDummyData = async function(){
    await User.deleteMany({email:test_data.email});
}