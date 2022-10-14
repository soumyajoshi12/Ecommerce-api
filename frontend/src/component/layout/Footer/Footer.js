import React from 'react'
import playstore from "../../../images/playstore.png"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftfooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore}/>
      </div>
      <div className="centerfooter"></div>
      <div className="rightfooter"></div>
    </footer>
  );
}

export default Footer