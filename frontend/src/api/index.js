import axios from "axios";
// const url="http://localhost:4000/";

//Get all product
export const fetchProducts = () => {
  let productLink = "/products";
  return axios.get(productLink, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get single product
export const fetchProductDetails = (id) =>
  axios.get(`/detailProduct/${id}`);

