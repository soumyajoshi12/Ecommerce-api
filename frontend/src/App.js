import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import webFont from "webfontloader";
import { BrowserRouter } from "react-router-dom";

function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
