const express = require("express");
const router = express.Router();
const {
  getallporducts,
  createProduct,
  updateProduct,
  deleteProduct,
  detailProduct,
} = require("../controllers/productcontroller");

// Get all product
router.get("/products", getallporducts);

// Create Product --admin
router.post("/createProduct", createProduct);

// Update Product --admin
router.put("/updateProduct/:id", updateProduct);

// Delete Product --admin
router.delete("/deleteProduct/:id", deleteProduct);

// Get Product Details
router.get("/detailProduct/:id", detailProduct);

module.exports = router;
