const express = require("express");
const router = express.Router();
const {
  getallporducts,
  createProduct,
  updateProduct,
  deleteProduct,
  detailProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productcontroller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Get all product
router.get("/products", getallporducts);

// Create Product --admin
router.post(
  "/admin/createProduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);

// Update Product --admin
router.put(
  "/admin/updateProduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

// Delete Product --admin
router.delete(
  "/admin/deleteProduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

// Get Product Details
router.get("/detailProduct/:id", detailProduct);

// create and update review
router.put("/review", isAuthenticatedUser, createProductReview);

//Get all Product  reviews
router.get("/review", getProductReviews);

//Delete review
router.delete("/review", isAuthenticatedUser, deleteReview);

module.exports = router;
