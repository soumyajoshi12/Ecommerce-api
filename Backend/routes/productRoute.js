const express = require("express");
const router = express.Router();
const {
  getallporducts,
  createProduct,
  updateProduct,
  deleteProduct,
  detailProduct,
} = require("../controllers/productcontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Get all product
router.get("/products", getallporducts);

// Create Product --admin
router.post(
  "/createProduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

// Update Product --admin
router.put(
  "/updateProduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

// Delete Product --admin
router.delete(
  "/deleteProduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

// Get Product Details
router.get("/detailProduct/:id", detailProduct);

module.exports = router;
