const express = require('express');
const router = express.Router();

const {getAllPage , createPage , deletepage} = require('../contorller/pagecontroller');

// all page
router.get('/' , getAllPage);

// create Page
router.post('/create' , createPage);

//delete Page
router.delete('/delete/:id' , deletepage)

module.exports = router;