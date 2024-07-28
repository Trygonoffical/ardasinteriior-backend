const express = require('express')
const router = express.Router();

const {GetAllRemote} = require('../controllers/generalController')

router.get('/', GetAllRemote)


module.exports = router;