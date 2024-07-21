const express = require('express');
const router = express.Router();
const auth = require('./auth')
const slider = require('./slider');
const page = require('./pages');
const banner = require('./banner')
const genaral = require('./genaral')
const customers = require('./customer')
const authenticateToken = require('../middleware/authenticateToken');

//genaral APIs

router.use('/config'  , genaral)


//Customer Login Routes
router.use('/auth' , auth)

//Sliders
router.use('/sliders' , authenticateToken , slider)

//Page
router.use('/page' , authenticateToken , page)



router.use('/customers' , authenticateToken , customers)

//adbanners 
router.use('/banner' , authenticateToken , banner)

module.exports = router;