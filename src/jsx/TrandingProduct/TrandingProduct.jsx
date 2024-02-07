import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import '../../assets/css/App.css';
import "../../assets/css/carouselHome.css";
import ShareIcon from "@mui/icons-material/Share";
import { NavLink, useNavigate } from "react-router-dom";
import PopUp from "../popup/PopUp";



const TrandingProduct = () => {

  
  return (
    <>
    <div
      className="card home-card-box mt-4 mb-4"
      >
      <div className="home-card-icnpost"
      
    //   onClick={() => RedirectDetailsPage(id, sku, slug)}
      >
        <img src='' alt="product" className="home-card-img" />
      </div>

      <div className="card-body" 
      
      >
        <h5 className="home-card-heading">
          {/* {category.length > 10 ? category.slice(0, 17) + "..." : category} */}hloo
        </h5>
        <p className="home-card-bx-cont">
          {/* {name.length > 10 ? name.slice(0, 20) + "..." : name} */}
        </p>
        <div className="d-flex justify-content-between">
          <p className="home-card-price">
            <CurrencyRupeeIcon className="home-card-iconsz" /> hlo
            <span className="hm-span-fnsz"></span>
          </p>
          <div>
            {/* <ShareIcon style={{marginRight:'10px', cursor:'pointer'}}/> */}
            



<FavoriteBorderIcon
className="hm-crd-posticon"
// style={{
//   background:
//     wishlistId &&
//     Array.isArray(JSON.parse(wishlistId)) &&
//     JSON.parse(wishlistId).some((ids) => ids === id)
//       ? "red"
//       : "black",
// }}
// onClick={async () => {
//   await wishList(id);
 
// }}
/>

          </div>
        </div>

        <div>
          <button
            className="trend-cart-btn"
            // onClick={() => RedirectDetailsPage(id, sku, slug)}
          >
            Show Details
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default TrandingProduct ;