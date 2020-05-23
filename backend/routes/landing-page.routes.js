const express = require('express');

var router = express.Router();

//landing page
router.get('/', (req, res) => {
    res.send("voucher landing page");
});

module.exports = router