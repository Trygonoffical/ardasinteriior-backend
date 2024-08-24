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
const popup = require('./popup')
const profile = require('./profile')
const about = require('./about')
const authenticateToken = require('../middleware/authenticateToken');
const custauthenticateToken = require('../middleware/custauthenticateToken');

// Remote Route

router.use('/config', general)


//Customer Login Routes
router.use('/auth' , auth)

//Sliders
router.use('/sliders' , authenticateToken , slider)

//Page
router.use('/page' , authenticateToken , page)


//about
router.use('/about' , authenticateToken , about)


//catetory
router.use('/category' , authenticateToken , category)


//adbanners 
router.use('/banner' , authenticateToken , banner)

router.use('/customers' , authenticateToken , customers)

//product 
router.use('/product' , authenticateToken, product)

//popup
router.use('/popup',authenticateToken ,  popup)

//Customer Profile update
router.use('/profileudpate',custauthenticateToken ,  profile)
module.exports = router;