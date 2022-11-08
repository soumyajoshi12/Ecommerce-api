import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import { Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import Footer from "./component/layout/Footer/Footer.js";
import webFont from "webfontloader";
import "./app.css"

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
      {/* <Routes> */}
        <Home />
        {/* <Route path="/" component={Home} /> */}
      {/* </Routes> */}
      <Footer />
    </>
  );
}
export default App;
