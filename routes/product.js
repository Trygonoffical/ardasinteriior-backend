const express = require('express')
const router = express.Router();
const path = require('path');
const {GetAllProducts , createProduct} = require('../controllers/productController')
const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })


// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/Products'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
const cpUpload = upload.fields([
  { name: 'mainImage', maxCount: 10 },
  { name: 'productGallery', maxCount: 10 },
  { name: 'addImage', maxCount: 10 },
]);

// get all products 
router.get('/', GetAllProducts)

// Create Product
router.post('/create', cpUpload, createProduct)



module.exports = router

