import React, { useState } from 'react';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import './reviewpage.css'
// import img1 from "../../assets/images/earring.jpg";
import StarIcon from '@mui/icons-material/Star';
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useEffect } from 'react';
import axios from 'axios';
// import { fetchData } from '../jewellery-page/ProductDetail';


const url = 'https://api.diwamjewels.com/DMJ/'
const productEnd = 'api/v1/products';
const productId = localStorage.getItem('productId');
const userId = localStorage.getItem("userId")


const ReviewPage = () => {
  return (
    <>
      <HeaderCon />
      <Navbar />
      <div className="rate-rev-bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <RateProduct />
            </div>
            <div className="col-md-4 mt-3">
              <ReviewComment />
            </div>
            <div className="col-md-8 mt-3">
              <RatingForm />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default ReviewPage;

const RateProduct = () => {


  const [product, setProductData] = useState('')

  const fetchData = async () => {

    if (productId) {
      try {
        const res = await axios.get(url + productEnd + '/' + productId);

        // const ratingRes = await axios.get(url + ratingEnd + '/' + id)


        // setSelectedImage(res.data.data.thum_image)
        // console.log(variantRes.data.data)
        // setVariant(variantRes.data.data)

        // setRating(ratingRes.data.data)



        // setItemInfo(res.data.data);
        setProductData(res.data.data)
        // console.log(res.data.data)
        // setIsLoad(false);
      } catch (err) {
        console.log(err);
        // setIsLoad(false);
      }
    }

    else {
      navigate('/')
    }

  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="rate-rev-frm shadow-sm">
        <div className="dis-rate-view-1">
          <h5 className="mt-3 rate-hd-h5-tag"><b>Ratings & Reviews</b></h5>
          <div className="" style={{ display: 'flex' }}>
            <div>
              <h6 className="revw-hd-fnt-bx"><b>{product.seo_title}</b></h6>
              <p className="rt-user-fnt-sz"><span className="rt-bg-view">4.5<StarIcon className="str-rate-icon" /></span> 700 users</p>
            </div>
            <img src={url} alt="image" className="rate-prod-img-1 ms-3" />
          </div>
        </div>
      </div>
    </>
  );
}


const RatingForm = () => {

  const rating = 'api/v1/Rating'

  const userId = '1';
  const updateRating = 'api/v1/Rating/particularUser/';


  const [star, setStar] = useState('')

  // const [render, setRender] = useState(true)


  async function fetchRating() {
    try {
      const res = await axios.get(url + updateRating + productId + '/' + userId)
      // console.log(res.data.data.rating)
      setStar(res.data.data.rating)
      // setRender(false)
    }
    catch (err) {
      console.log(err)
    }

  }

  async function upRating(star) {

    try {
      const res = await axios.post(url + rating, {
        "userId": userId,
        "rating": star,
        "productId": productId
      })
      console.log(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    fetchRating()
  }, [])

  return (
    <>

      <div className="rate-rev-frm shadow-sm">
        <div className="pro-rev-box-1">
          <form action="">
            <h5 className="offer-heading-txt">
              <b>Rate Product</b>
            </h5>
            <Stack spacing={1}>
              <Rating
                className="cmt-rev-box"
                name="half-rating"
                value={parseInt(star)}
                precision={1}
                onChange={(e) => {
                  upRating(e.target.value)
                  setStar(e.target.value)
                }}
              />
            </Stack>
            <label htmlFor="" className="form-label mt-2 cmt-rev-fnt">
              Review this product
            </label>
            <textarea
              name=""
              id=""
              cols="10"
              rows="4"
              className="form-control cmt-rev-input"
              placeholder='Description'
            ></textarea>
            <label htmlFor="" className="form-label mt-2 cmt-rev-fnt">
              Title (optional)
            </label>
            <textarea
              name=""
              id=""
              cols="10"
              rows="1"
              className="form-control cmt-rev-input"
              placeholder='Review title...'
            ></textarea>
            <label htmlFor="" className="form-label mt-2 cmt-rev-fnt">
              Product Image
            </label>
            <input type="file" className="form-control cmt-rev-input" />
            <div>
              <button className="cmt-rev-box-smt">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const ReviewComment = () => {
  return (
    <>
      <div className="stk-box-item">
        <div className="rate-rev-frm shadow-sm">
          <h6 className="revw-hd-fnt-bx"><b>What makes a good review</b></h6>
        </div>
        <div className="rate-rev-frm shadow-sm mt-1">
          <h6 className="revw-hd-fnt-bx"><b>Have you used this product?</b></h6>
          <p className="revw-fnt-bx-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, numquam. Quaerat eaque sequi dicta consequuntur.</p>
          <hr />
          <h6 className="revw-hd-fnt-bx"><b>Why review a product?</b></h6>
          <p className="revw-fnt-bx-1">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta, nam.</p>
          <hr />
          <h6 className="revw-hd-fnt-bx"><b>How to review a product?</b></h6>
          <p className="revw-fnt-bx-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, perspiciatis.</p>
        </div>
      </div>
    </>
  );
}