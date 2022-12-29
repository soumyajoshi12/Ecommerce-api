import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
import { getProductsAsync } from "../../ascynActions/productAsync";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <Fragment>{loading ? <Loader /> : <Fragment>
      <h2 className="productsHeading">Products</h2>
      <div className="products">
        {products && products.map((product) =>(
          <Product key={product._id} product={product} />
        ))}
      </div>
      </Fragment>}</Fragment>
  );
  
};

export default Products;
