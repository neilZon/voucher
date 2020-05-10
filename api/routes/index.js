var express = require('express');
var router = express.Router();

//landing page
router.get('/', (req, res) => {
    res.send("voucher landing page");
});

// register page
router.get('/register', (req, res) => {
    res.send("this is the register page");
});

// login page
router.get('/login', (req, res) => {
    res.send("this is the login page");
});

// login authentication
router.post('/login', (req, res) => {
    res.send("login authentication");
});

module.exports = router; 