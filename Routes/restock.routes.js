const express = require("express");
const router = express.Router();
const { addRestock, getRestock } = require("../Controller/restock.controller");

router.post("/addrestock", addRestock);
router.get("/getrestock", getRestock);

module.exports = router;