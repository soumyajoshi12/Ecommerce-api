import {
  getProducts,
  getProductsRequest,
  getProductsFail,
} from "../features/productSice";
import * as api from "../api/index";
export const getProductsAsync = () => async (dispatch) => {
  try {
    dispatch(getProductsRequest());
    let res = await api.fetchProducts();
    // console.log(d.data);
    dispatch(getProducts(res.data));
  } catch (err) {
    console.log(`error:${err.message}`);
    dispatch(getProductsFail(err.message));
  }
};
