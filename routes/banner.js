const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllbanners ,createbanner } = require('../contorller/bannercontroller');
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })


// Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../public/uploads/adbanners'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/adbanners'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });


  // Middleware to handle single file upload with the field name 'deskfile'
  const singleFileUpload = upload.single('deskfile');
// get all banners 
router.get('/', getAllbanners)

// create slider 
router.post('/create' ,singleFileUpload, createbanner)

module.exports = router;