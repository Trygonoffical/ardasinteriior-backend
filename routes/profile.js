const express = require('express');
const router = express.Router();
const path = require('path');
const {updateProfile, updateLocationProfile} = require('../controllers/pageController');


//udpate 
router.post('/' , updateProfile);
router.post('/locationupdate' , updateLocationProfile);

module.exports = router;