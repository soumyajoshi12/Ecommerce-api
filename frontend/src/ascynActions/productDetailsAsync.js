import {
  getProductDetails,
  getProductDetailsFail,
  getProductDetailsRequest,
} from "../features/productDetailSlice";

import * as api from "../api/index";

export const getProductDetailsAsync = (id) => async (dispatch) => {
  try {
    // console.log(id);
    dispatch(getProductDetailsRequest());
    const res = await api.fetchProductDetails(id);
    dispatch(getProductDetails(res.data.product));
    // if (res.status === 200) {
    // }
  } catch (error) {
    console.log("err");
    dispatch(getProductDetailsFail(error.message));
  }
};
