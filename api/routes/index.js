var express = require('express');
var router = express.Router();

// register page
router.get('/register', (req, res) => {
    res.send("this is the register page")
});

// login page
router.get('/login', (req, res) => {
    res.send("this is the login page")
})

// login authentication

module.exports = router