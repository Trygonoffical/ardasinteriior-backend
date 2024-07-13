const express = require('express');
const router = express.Router();
const {getAllCustomers } = require('../contorller/customercontroller') 
// home page sliders Routes
router.get('/' , getAllCustomers);


module.exports = router;