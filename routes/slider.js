const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllSlider , createSlider, deleteSlider , editSlider} = require('../contorller/slidercontroller');
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/uploads/Sliders'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });


// home page sliders Routes
router.get('/' , getAllSlider);

// create slider 
router.post('/create' ,upload.array('files'),createSlider)

//edit slider
router.put('/slider/:id' , editSlider)

//delete slider
router.delete('/delete/:id' , deleteSlider)

module.exports = router;