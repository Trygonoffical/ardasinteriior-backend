const express = require('express');
const router = express.Router();
const path = require('path');
const {remote } = require('../contorller/genaralcontroller.js');

router.get('/' , remote)



module.exports = router;