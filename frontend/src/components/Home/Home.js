import { Fragment, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import "./Home.css";
import Product from "./Product.js";
import Metadata from "../layout/Metadata";
import { useDispatch  } from "react-redux";
import { getProductsAsync } from "../../ascynActions/productAsync";
import logo from "../../images/ROBBIN.png";


const product = {
  name: "Goa Tshirt",
  images: [
    { url: "https://m.media-amazon.com/images/I/61gqx7hslmL._UX569_.jpg" },
  ],
  price: "$100",
  _id: "p1",
};

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  return (
    <Fragment>
      <Metadata title="ROBBIN"></Metadata>
      <div className="banner">
        <img src={logo}></img>
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
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
