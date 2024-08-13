const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllCategory ,createCategory , deleteCategory , updateCategory } = require('../controllers/categoryController');
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/category'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });
// Middleware to handle single file upload with the field name 'catfile'
const singleFileUpload = upload.single('catfile');



// get all Category 
router.get('/', getAllCategory)


// Update the Category
router.put('/update/:id',singleFileUpload , updateCategory)
// delete the category
router.delete('/delete/:id', deleteCategory)

// create Category 
router.post('/create' ,singleFileUpload, createCategory)

module.exports = router;