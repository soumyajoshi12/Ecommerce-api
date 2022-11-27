import { useEffect } from "react";
import Header from "./components/layout/Header/Header.js";
import { Routes, Route } from "react-router-dom";
import webFont from "webfontloader";
import "./app.css";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/productDetails.js"

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
