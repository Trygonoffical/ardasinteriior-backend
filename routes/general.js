const express = require('express')
const router = express.Router();

const {GetAllRemote , SingleProduct , GetLatestProductsByCategory , getSingleCategory, GetAllProducts , VerifyCoupon} = require('../controllers/generalController')

router.get('/', GetAllRemote)
router.get('/latestProduct', GetLatestProductsByCategory)
router.post('/singleProduct', SingleProduct)
// get single Category with all the products and sub categories
router.post('/singleCat', getSingleCategory)
router.get('/getallproducts' , GetAllProducts)
router.post('/VerifyCoupon', VerifyCoupon)
module.exports = router;