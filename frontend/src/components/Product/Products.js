import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
// import Product from "../Home/ProductCard";
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
    <Fragment>{loading ? <Loader /> : <Fragment>Done</Fragment>}</Fragment>
  );
  // return <div>done</div>
};

export default Products;
