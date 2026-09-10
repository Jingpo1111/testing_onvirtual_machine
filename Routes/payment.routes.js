const express = require('express');
const router = express.Router();
const { addPayment, getPayment } = require('../Controller/payment.controller');


router.post('/addpayment', addPayment);
router.get("/getpayment", getPayment);

module.exports = router;