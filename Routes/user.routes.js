const express = require('express');
const router = express.Router();
const { getUser, createUser, deleteUser, loginUser } = require('../Controller/user.controller');


router.get('/user', getUser);
router.post('/createUser', createUser);
router.delete("/deleteUser", deleteUser);
router.post('/login', loginUser);


module.exports = router;