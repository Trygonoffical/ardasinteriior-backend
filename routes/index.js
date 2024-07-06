const express = require('express');
const router = express.Router();
const auth = require('./auth')
const slider = require('./slider');
const genaral = require('./genaral')
const authenticateToken = require('../middleware/authenticateToken');

//genaral APIs

router.use('/config'  , genaral)


//Customer Login Routes
router.use('/auth' , auth)

//Sliders
router.use('/sliders' , authenticateToken , slider)
// router.use('/sliders'  , slider)





module.exports = router;