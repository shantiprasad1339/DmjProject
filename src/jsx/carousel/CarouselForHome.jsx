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

import axios from "axios";

const proto = "https://api.diwamjewels.com/DMJ/";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 3,
  },
};

const CarouselForHome = (props) => {
  const { productData } = props;

  const { item } = props;

  return (
    <>
      {/* <div className="home-slider-boxvw"> */}
      <br></br>

      {item === "img" ? (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="productcard-home-sldr"
          arrows={true}
        >
          {productData &&
            productData.map((data, index) => {
              return <CarouselCard key={index} img={data.image} />;
            })}
        </Carousel>
      ) : (
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-10-px"
          arrows={true}
        >
          {productData &&
            productData.map((item) => {
              console.log(item);
              return (
                <ProductCard
                  key={item.id}
                  img={proto + "images/" + item.thum_image}
                  name={item.seo_title}
                  category={item.name}
                  id={item.id}
                  price={item.price}
                  sku={item.sku}
                  slug={item.slug}
                />
              );
            })}
        </Carousel>
      )}

      {/* 
        </div> */}
    </>
  );
};
export default CarouselForHome;

class CarouselCard extends React.Component {
  render() {
    const { img } = this.props;
    return (
      <>
        <div className="sliderCard">
          <div className="sliderCardImg">
            <img src={img} className="img-fluid sliderImg" alt="Image" />
          </div>
          <p className="mt-3 product-font text-center">Art & Craft</p>
        </div>
      </>
    );
  }
}

const ProductCard = ({ img, name, category, id, price, sku, slug }) => {
  const navigate = useNavigate();
  // console.log(sku,slug)

  function RedirectDetailsPage(id, sku, slug) {
    navigate(`/p/` + slug + "/" + sku, { state: { id: id } });
    localStorage.setItem("productId", id);
  }
  const wishlistId = localStorage.getItem("wishList");
  const wishList = (id) => {
    let existingCart = JSON.parse(localStorage.getItem("wishList")) || [];
    let userCheck = localStorage.getItem("mobileNo");
  
    // Check if userCheck is available
    if (!userCheck) {
      // Navigate to "/popup" route
      navigate("/login");
      return; // Stop execution if userCheck is not available
    }
  
    // Check if id already exists in existingCart
    const index = existingCart.indexOf(id);
  
    if (index !== -1) {
      // If id exists, remove it from existingCart
      existingCart.splice(index, 1);
    } else {
      // If id doesn't exist, add it to existingCart
      existingCart.push(id);
    }
  
    // Update localStorage with modified existingCart
    localStorage.setItem("wishList", JSON.stringify(existingCart));
    window.location.reload()
  };
  
  
  return (
    <>
      <div
        className="card home-card-box mt-4 mb-4"
        >
        <div className="home-card-icnpost"
        
        onClick={() => RedirectDetailsPage(id, sku, slug)}
        >
          <img src={img} alt="product" className="home-card-img" />
        </div>

        <div className="card-body" 
        
        >
          <h5 className="home-card-heading">
            {category.length > 10 ? category.slice(0, 17) + "..." : category}
          </h5>
          <p className="home-card-bx-cont">
            {name.length > 10 ? name.slice(0, 20) + "..." : name}
          </p>
          <div className="d-flex justify-content-between">
            <p className="home-card-price">
              <CurrencyRupeeIcon className="home-card-iconsz" /> {price}{" "}
              <span className="hm-span-fnsz"></span>
            </p>
            <div>
              {/* <ShareIcon style={{marginRight:'10px', cursor:'pointer'}}/> */}
              {/* <FavoriteBorderIcon
                className="hm-crd-posticon"
                onClick={async () => {
                  await wishList(id);
                  window.location.reload()
                }}
              /> */}



<FavoriteBorderIcon
  className="hm-crd-posticon"
  style={{
    background:
      wishlistId &&
      Array.isArray(JSON.parse(wishlistId)) &&
      JSON.parse(wishlistId).some((ids) => ids === id)
        ? "red"
        : "black",
  }}
  onClick={async () => {
    await wishList(id);
   
  }}
/>

            </div>
          </div>

          <div>
            <button
              className="trend-cart-btn"
              onClick={() => RedirectDetailsPage(id, sku, slug)}
            >
              Show Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductCard };
