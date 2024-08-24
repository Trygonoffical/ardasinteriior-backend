const express = require('express');
const router = express.Router();
const path = require('path');

const {updateAboutPage} = require('../controllers/pageController');

const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/about'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const cpUpload = upload.fields([
  { name: 'leftImg', maxCount: 1 },
  { name: 'rightImg', maxCount: 1 }
]);

router.post('/',cpUpload, updateAboutPage)

module.exports = router;
