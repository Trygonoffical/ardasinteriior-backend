const express = require('express');
const router = express.Router();
const {login , registation , viewAll , customerLogin , validatePhone} = require('../controllers/authController');



// Customer Login Routes
router.post('/register' , registation);
router.post('/login' , login);
router.get('/allusers' , viewAll);
router.post('/custlogin', customerLogin)
router.post('/validateOTP' , validatePhone)

module.exports = router;