//=====================  test_helper.js  ======================

const User = require('../models/Users.models')

const loginFormTestData = {
    email: "john@email.com",
    password: "testpassword123",
    confirmPassword: "testpassword123",
    firstname: "Johnny"
}

const dbTestData = {
    email: "john@email.com",
    hash: "testpassword123",
    firstname: "Johnny"
}

const businessFormTestData = {
    businessName:"Test Business name",
    address:"1234 Palo Alto Ave",
    phoneNumber:"8341231231",
    email:"business@email.com",
    affiliation:"head manager",
    password:"pahuidsfgi2134t43gdfr2344tregwf",
    confirmPassword:"pahuidsfgi2134t43gdfr2344tregwf",
    firstname:"Firstname",
    lastname:"Lastname"
}

const businessDBTestData = {
    businessName:"Test Business name",
    address:"1234 Palo Alto Ave",
    phoneNumber:"8341231231",
    email:"business@email.com",
    affiliation:"head manager",
    hash:"pahuidsfgi2134t43gdfr2344tregwf",
    firstname:"Firstname",
    lastname:"lastname"
}

// make available to other files
module.exports.loginFormTestData = loginFormTestData;
module.exports.dbTestData = dbTestData;
module.exports.businessDBTestData = businessFormTestData;
module.exports.businessDBTestData = businessDBTestData;

// add dummy user 
module.exports.addDummyData = async function(userObj){
    newUser = new User(userObj)
    await newUser.save(function(err){
        if(err) return console.log('err');
    })
}

// delete dummy user
module.exports.removeDummyData = async function(){
    await User.deleteMany({email:dbTestData.email});
}