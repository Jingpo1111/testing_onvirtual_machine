const express = require('express');
const router = express.Router();
const { addProduct, getProduct, deleteProduct } = require("../Controller/product.controller");


router.post("/addproduct", addProduct);
router.get("/getproduct", getProduct);
router.delete("/deleteproduct", deleteProduct);


module.exports = router;