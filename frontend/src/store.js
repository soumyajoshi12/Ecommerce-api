import { configureStore  } from "@reduxjs/toolkit";
import productSlice from "../src/features/productSice"
import productDetailSlice from "./features/productDetailSlice";


export const store = configureStore({
  reducer: {
    products: productSlice,
    productDetail: productDetailSlice,
  },
});


