const express = require('express');
const router = express.Router();
const {getAllCustomers } = require('../controllers/customerController') 
// home page sliders Routes
router.get('/' , getAllCustomers);

//get All banners
module.exports = router;