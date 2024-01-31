import React, { useState } from 'react';
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import FilterCard from "../ProductCard/FilterCard";
import ProductFilter from "../ProductCard/ProductFilter1";

import Footer from "../footer/Footer";
import "./search.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search</title>
        <meta name="description" content="Search" />
        <meta name="keywords" content="search" />
      </Helmet>
      <HeaderCon />
      <Navbar />

      <p className="breadcrumb-fnt-sz ms-3"> Home / Products </p>

      <ProductFilter />

      <div>
        <FilterCard />
      </div>
      <div className="mt-4 mb-3">
   
      </div>
     
    
      <Footer />
    </>
  );
};

export default Search;


