const express = require('express');
const router = express.Router();
const { addPromotion, getpromotions, deletepromotions } = require('../Controller/promotion.controller');

router.post('/addpromotion', addPromotion);
router.get('/getpromotion', getpromotions);
router.delete('/deletepromotion', deletepromotions);

module.exports = router;