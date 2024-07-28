const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllBanners ,createBanner , editBanner } = require('../controllers/bannerController');
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
  // const singleFileUpload = upload.single('deskfile');
  const cpUpload = upload.fields([
    { name: 'deskfile', maxCount: 10 },
    { name: 'mobfile', maxCount: 10 }
  ]);
// get all banners 
router.get('/', getAllBanners)

// create slider 
router.post('/create' ,cpUpload, createBanner)

//edit slider
router.put('/update/:id' ,cpUpload, editBanner)

module.exports = router;