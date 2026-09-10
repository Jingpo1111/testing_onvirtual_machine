const express = require('express');
const router = express.Router();
const { addCategory, getCategory, deleteCategory } = require("../Controller/category.controller");



router.post("/addcategory", addCategory);
router.get("/getcategory", getCategory);
router.delete("/deletecategory", deleteCategory);


module.exports = router;