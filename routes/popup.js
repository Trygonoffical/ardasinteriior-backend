const express = require('express');
const router = express.Router();
const path = require('path');
const {updatePopup} = require('../controllers/pageController');
// storage 
const multer = require('multer')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/popup'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// Middleware to handle single file upload with the field name 'catfile'
const singleFileUpload = upload.single('Img');

//udpate 
router.post('/' , singleFileUpload, updatePopup);

module.exports = router;