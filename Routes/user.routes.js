const express = require('express');
const router = express.Router();
const { getUser, createUser, deleteUser } = require('../Controller/user.controller');


router.get('/user', getUser);
router.post('/createUser', createUser);
router.delete("/deleteUser", deleteUser);


module.exports = router;