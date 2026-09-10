const express = require('express');
const router = express.Router();
const { AddOrder, getOrder, deleteOrder } = require('../Controller/order.controller');


router.post('/addorder', AddOrder);
router.get("/getorder", getOrder);
router.delete("/deleteorder", deleteOrder);


module.exports = router;