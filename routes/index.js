const express = require('express')
const router = express.Router();
const general  = require('./general')
const auth = require('./auth')
const slider = require('./slider')
const page = require('./pages')
const category = require('./category')
const customers = require('./customer')
const banner = require('./banner')
const product = require('./product')
const authenticateToken = require('../middleware/authenticateToken');


// Remote Route

router.use('/config', general)

//Customer Login Routes
router.use('/auth' , auth)

//Sliders
router.use('/sliders' , authenticateToken , slider)

//Page
router.use('/page' , authenticateToken , page)

//catetory
router.use('/category' , authenticateToken , category)

//adbanners 
router.use('/banner' , authenticateToken , banner)

router.use('/customers' , authenticateToken , customers)

//product 
router.use('/product' , authenticateToken, product)


module.exports = router;