const express = require('express');
const router = express.Router();

const {getAllPage , createPage , deletepage , updateSocialLinks , updateTopHead , updateCompanyInfo  , updateHomeCategories , getHomeCategories , updateHomeMenu , updateSubMenu} = require('../controllers/pageController');

const path = require('path');
// storage 
const multer = require('multer')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/companylogo'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// Middleware to handle single file upload with the field name 'catfile'
const singleFileUpload = upload.single('logo');



// all page
router.get('/' , getAllPage);

// create Page
router.post('/create' , createPage);

//udpate Social Links
router.post('/sociallinks' , updateSocialLinks);

//udpate top Head
router.post('/tophead' , updateTopHead);


//udpate Home Categories
router.post('/homecats' , updateHomeCategories);
router.get('/homecats' , getHomeCategories);


//udpate Company Info
router.post('/companyinfo' , singleFileUpload, updateCompanyInfo);

//delete Page
router.delete('/delete/:id' , deletepage)


// Menu creations 

router.post('/menucats' , updateHomeMenu);
router.post('/submenu', updateSubMenu)


module.exports = router;