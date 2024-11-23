const express = require('express');
const router = express.Router();
const path = require('path');
const {updateProfile, updateLocationProfile , checkCoupon , paymentInitials, deleteLocationProfile} = require('../controllers/pageController');


//udpate 
router.post('/' , updateProfile);
router.post('/locationupdate' , updateLocationProfile);
router.post('/checkCoupon', checkCoupon)
router.post('/paymentIntials', paymentInitials)
router.delete('/location/:id', deleteLocationProfile)
module.exports = router;