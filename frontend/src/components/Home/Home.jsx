import { Fragment, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import "./Home.css";
import Product from "./Product.jsx";
import Metadata from "../layout/Metadata";
import { useDispatch } from "react-redux";
import { getProductsAsync } from "../../ascynActions/productAsync";
import logo from "../../images/ROBBIN.png";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, productsCount, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader/>
      ) : (
        <Fragment>
          <Metadata title="ROBBIN"></Metadata>
          <div className="banner">
            <img src={logo} alt="Logo"></img>
            <p>Welcome to ROBBIN</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <i className="ri-mouse-line"></i>
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
