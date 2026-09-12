const express = require('express');
const router = express.Router();
const { getReview, addReview } = require('../Controller/review-note.controller');

router.get('/getreview', getReview);
router.post('/addreview', addReview);


module.exports = router;