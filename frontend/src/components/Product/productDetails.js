import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsAsync } from "../../ascynActions/productDetailsAsync";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { clearError } from "../../features/productDetailSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { productDetails, loading, success, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if(error) {
     alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProductDetailsAsync(param.id));
  }, [dispatch, param.id],error);
  

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: productDetails && productDetails.ratings,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div id="ProductImage">
              <Carousel>
                {productDetails &&
                  productDetails?.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{productDetails && productDetails.name}</h2>
                <p>Product # {productDetails && productDetails._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>
                  ({productDetails && productDetails.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`Rs ${productDetails && productDetails.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  {""}
                  <button>Add to Cart</button>
                </div>
                <p>
                  status:{""}{" "}
                  <b
                    className={
                      productDetails && productDetails.Stock < 1
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {productDetails && productDetails.Stock < 1
                      ? "OutOfStock"
                      : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description :{" "}
                <p>{productDetails && productDetails.description}</p>
              </div>
              <button className="submitReview"> Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>

          {productDetails && productDetails.reviews[0] ? (
            <div className="reviews">
              {productDetails.reviews &&
                productDetails.reviews.map((review) => (
                  <ReviewCard review={review} />
                ))}
            </div>
          ) : (
            <p className="noReview">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
