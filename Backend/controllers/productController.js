const { fork } = require("child_process");
const ProductModel = require("../models/ProductModel");

// Get all product
exports.getallporducts = async (req, res) => {
  const allProducts = await ProductModel.find();
  res.status(200).json({
    success: true,
    allProducts,
  });
};

// Create Product --admin
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    // console.log(req.body);
    const createdProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      createdProduct,
    });
  } catch (err) {
    res.send(err.message);
  }
};

//Get Product Details
exports.detailProduct = async (req, res) =>{
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(201).json({
    success: true,
    message: "Product is deleted",
    product
  });
}

// Update Product --admin
exports.updateProduct = async (req, res) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
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
    updateporduct,
  });
};

// Delete Product --admin
exports.deleteProduct = async (req, res) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
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
};
