import { configureStore  } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
import productSlice from "../src/features/productSice"



export const store = configureStore({
  reducer: {
    products:productSlice,
  },
});

export default  store;
