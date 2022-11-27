import {
  getProductDetails,
  getProductDetailsFail,
  getProductDetailsRequest,
} from "../features/productDetailSlice";

import * as api from "../api/index";

export const getProductDetailsAsync = (id) =>async (dispatch) =>{
try {
    dispatch(getProductDetailsRequest());
    const res = await api.fetchProductDetails(id)
    dispatch(getProductDetails(res.data.product))
} catch (error) {
    dispatch(getProductDetailsFail(error.message))
}
}