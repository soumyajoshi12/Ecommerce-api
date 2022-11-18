// const { fork } = require("child_process");
const ProductModel = require("../models/ProductModel");
const ApiFeatures = require("../utils/apifeature");

// Get all product
exports.getallporducts = async (req, res) => {
  try {
    const resutPerPage = process.env.resutPerPage;
    const productCount = await ProductModel.countDocuments();

    const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter()
      .pagination(resutPerPage);
    const allProducts = await apiFeature.query;
    res.status(200).json({
      success: true,
      allProducts,
    });
  } catch (error) {
    res.send(error.message);
  }
};
// Create Product --admin
exports.createProduct = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const newProduct = new ProductModel(req.body);
    // console.log(req.body);
    const createdProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      createdProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Get Product Details
exports.detailProduct = async (req, res) => {
  try {
    let product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(201).json({
      success: true,
      message: "Product details",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product --admin
exports.updateProduct = async (req, res) => {
  try {
    let product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    let updatedporduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
      updatedporduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product --admin
exports.deleteProduct = async (req, res) => {
  try {
    let product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
      message: "Product is deleted",
      // product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Create New Review or Update the review
exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await ProductModel.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Your review is saved",
  });
};

// Get all Review of a product

exports.getProductReviews = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.query.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};