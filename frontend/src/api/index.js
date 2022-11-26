import axios from "axios";
// const url="http://localhost:3020/api/v1";

export const fetchProducts = () => {
  let productLink = "/products";

  return axios.get(productLink, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
