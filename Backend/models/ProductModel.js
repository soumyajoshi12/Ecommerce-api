const mongoose = require("mongoose");
const { Schema , model} = mongoose;

const productSchema = Schema({
  name: {
    type: String,
    required: [true, " Please enter product name"],
  },
  description: {
    type: String,
    required: [true, " Please enter product description"],
  },
  price: {
    type: String,
    require: [true, " Please enter product price"],
    maxLenght: [6, "Price cannot be more then 6 characters"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, " Please enter product category"],
  },
  stock: {
    type: String,
    required: [true, " Please enter product stock"],
    maxLenght: [4, "Price cannot be more then 4 characters"],
    default:1
  },
  numOfReviews :{
    type : Number,
    default:0
  },
  reviews:[
    {
        name:{
            type:String,
            required: true
        },
        rating:{
            type:Number,
            required:true,
        },
        comment:{
            type:String,
            required:true
        }
    }
  ],
  createdAt:{
    type:Date,
    default: Date.now
  }
});

const Product = model("Product",productSchema);

module.exports = Product;