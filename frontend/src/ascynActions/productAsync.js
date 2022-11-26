import {getProducts, getProductsRequest, getProductsFail} from '../features/productSice'
import * as api from '../api/index'
export const getProductsAsync=()=>async(dispatch)=>{
try{
    dispatch(getProductsRequest());
    let d = await api.fetchProducts();
    // console.log(d.data);
    dispatch(getProducts(d.data))
}
catch(err){
console.log(err);
}
}