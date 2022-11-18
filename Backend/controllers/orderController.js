const orderModel = require("../models/orderModel");
const productModel = require("../models/ProductModel");

//Create new order
exports.newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get single order detials
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(401).json({
        success: false,
        message: "Order not found with this Id",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get logged in user Orders
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get All Orders -- admin
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find();

    let totalAmount = 0;

    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// update Order Status - Admin
exports.updateOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(401).json({
        success: false,
        message: "Order not found with this Id",
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "you have already delivere this order",
      });
    }

    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.delivereAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Orders -- admin
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(401).json({
        success: false,
        message: "Order not found with this Id",
      });
    }
    await order.remove();

    res.status(200).json({
      success: true,
      message:"Order Deleted"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
