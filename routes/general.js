const express = require('express')
const router = express.Router();

const {GetAllRemote , SingleProduct , GetLatestProductsByCategory} = require('../controllers/generalController')

router.get('/', GetAllRemote)
router.get('/latestProduct', GetLatestProductsByCategory)
router.post('/singleProduct', SingleProduct)


module.exports = router;