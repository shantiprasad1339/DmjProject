import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import Footer from "../footer/Footer";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Carousel from "react-bootstrap/Carousel";

import "../../assets/css/trending.css";
// import { NavLink } from 'react-router-dom';
import ProductWrapper from "../productWrapper/ProductWrapper";
import Loader from "../loader/Loader";
import banner1 from '../BannerImg/banner1.webp'
import banner2 from '../BannerImg/banner2.webp'


import { RelatedProduct } from "../jewellery-page/ProductDetail";
import { Helmet } from "react-helmet";

const proto = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/banner";
const searchEndPoint = "api/v1/products";
const imgUrl = "https://images.diwamjewels.com/";


const Home = () => {
  const [bannerData, setBanner] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [productInfo, setProductInfo] = useState([]);

  const fetData = async () => {
    try {
      const res = await axios.get(`${proto}${searchEndPoint}`);
      const bannerRes = await axios.get(`${proto}${endPoint}`);
      // console.log(res.data.data)
      setProductInfo(res.data.data);
      setBanner(bannerRes.data.data);
      setIsLoad(false);
    } catch (error) {
      console.log(error);
      setIsLoad(true);
    }
  };

  useEffect(() => {
    fetData();
  }, [productInfo]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>DMJ</title>
        <meta name="description" content="Diwam Jewellers" />
        <meta name="keywords" content="" />
      </Helmet>
      {isLoad ? (
        <Loader />
      ) : (
        <>
          <HeaderCon />
          <Navbar />
          <MainCarousel bannerData={bannerData} />

          <div className="" style={{overflowX:'hidden !hidden'}}>
            <h3 className="text-center mt-4">
              <b>Trending Products</b>
            </h3>
            <RelatedProduct />
       
          </div>
          <ProductWrapper />

          <Footer />
        

        </>
      )}
    </>
  );
};

export default Home;

const MainCarousel = ({ bannerData }) => {
  return (
    <>
      <Carousel
        style={{ left: "0px" }}
        nextIcon={
          <i className="bi bi-arrow-right-circle-fill text-dark fs-1"></i>
        }
        prevIcon={
          <i className="bi bi-arrow-left-circle-fill text-dark fs-1"></i>
        }
      >
        {bannerData.map((banner) => {
        
          return (
            <Carousel.Item key={banner.id} className="main-bannerimg-sz">
              <img
                className=""
                src={imgUrl + banner.image}
                alt="slide"
               
              />
            </Carousel.Item>
          );
        })}
       
      </Carousel>
    </>
  );
};
