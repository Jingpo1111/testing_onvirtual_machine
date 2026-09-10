const express = require('express');
const router = express.Router();
const { viewOrder, updateStatus } = require('../Controller/view.controller');

router.get("/vieworder", viewOrder);
router.patch("/updatestatus", updateStatus);

module.exports = router;
