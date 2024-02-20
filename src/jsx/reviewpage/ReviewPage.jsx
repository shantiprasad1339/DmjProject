import React, { useState } from 'react';
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import './reviewpage.css'
import { useParams ,useNavigate} from 'react-router-dom';
// import img1 from "../../assets/images/earring.jpg";
import StarIcon from '@mui/icons-material/Star';
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useEffect } from 'react';
import axios from 'axios';
// import { fetchData } from '../jewellery-page/ProductDetail';
import { Navigate } from 'react-router-dom';
import { Logger } from 'sass';

const url = 'https://api.diwamjewels.com/DMJ/'
const productEnd = 'api/v1/products';
const productId = localStorage.getItem('productId');
const userId = localStorage.getItem("userId")


const ReviewPage = () => {
  const {prid} = useParams()
  const userId = localStorage.getItem("userId")
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
              <RatingForm uId={userId} pId={prid}/>
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
      // navigate('/')
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
              {/* <h6 className="revw-hd-fnt-bx"><b>{product.seo_title}</b></h6> */}
              {/* <p className="rt-user-fnt-sz"><span className="rt-bg-view">4.5<StarIcon className="str-rate-icon" /></span> 700 users</p> */}
            </div>
            {/* <img src={url} alt="image" className="rate-prod-img-1 ms-3" /> */}
          </div>
        </div>
      </div>
    </>
  );
}


const RatingForm = ({uId,pId}) => {
  const [ratingTitle,setRatingTitle] = useState("")
  const [ratingDesc,setRatingDesc] = useState("")
  const [ratingFile,setRatingFile] = useState([])
    const rating = 'api/v1/Rating'
  
    const updateRating = 'api/v1/Rating/particularUser/';
  const[chooseRating,setChooseRating] = useState(false)
  
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
  
    function handleRatingCount (e){
      setStar(e.target.value)
      setChooseRating(true)
    }
  
  
    useEffect(() => {
      fetchRating()
    }, [])





















    async function multipleImages(imgArray) {
      if (!imgArray || imgArray.length === 0) {
        
          return '';
      }
  
      const uploadUrl = 'https://goldfish-app-qynu4.ondigitalocean.app/multiple/with/bucketname';
      const headers = {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      };
      const responses = [];
  
      // Convert imgArray to an array if it's not already
      const images = Array.isArray(imgArray) ? imgArray : [imgArray];
  
      for (const img of images) {
          const formData = new FormData();
          formData.append('images', img); 
          formData.append('bucketName', 'review'); 

  
          try {
              const res = await axios.post(uploadUrl, formData, { headers });
              responses.push(res.data.data);
          } catch (err) {
              console.log(err);
          }
      }
  
      // Flatten the array of arrays and join image paths with comma
      return responses.flat().join(', ');
  }
  
  
 
  

















   
  

  const Navigate = useNavigate()
  
  async function handleRating(e) {
    e.preventDefault();
    if (chooseRating === true) {
        setStar(e.target.value);
      
        console.log(ratingFile);
          const resImg = await multipleImages(ratingFile);
      
      console.log("image response=====>>>>>",resImg,uId,pId);
        try {
            const res = await axios.post(url + rating, {
                "userId": uId,
                "rating": star,
                "orderId": pId,
                "title": ratingTitle,
                "description": ratingDesc,
                "pictures": resImg
            });
            if (res.data.message === "Thank you for your Rating ") {
                console.log(res.data);
                setRatingTitle("");
                setRatingDesc("");
                setRatingFile(null);
                setStar("");
                alert(res.data.message);
                Navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        alert("Please choose a rating.");
    }
}



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
               onChange={
                handleRatingCount
              }
              />
            </Stack>
            <label htmlFor="" className="form-label mt-2 cmt-rev-fnt">
              Review this product
            </label>
            <textarea
              name=""
              id=""
              cols="10"
              value={ratingDesc}
              rows="4"
              className="form-control cmt-rev-input"
              placeholder='Description'
              onChange={(e)=>setRatingDesc(e.target.value)}
            ></textarea>
            <label htmlFor="" className="form-label mt-2 cmt-rev-fnt">
              Title (optional)
            </label>
            <textarea
              name=""
              id=""
              value={ratingTitle}
              cols="10"
              rows="1"
              className="form-control cmt-rev-input"
              placeholder='Review title...'
              onChange={(e)=>setRatingTitle(e.target.value)}

            ></textarea>
            <label htmlFor="" className="form-label mt-2 cmt-rev-fnt">
              Product Image
            </label>
            <input type="file" className="form-control cmt-rev-input" 
                        onChange={(e) => setRatingFile([...ratingFile, ...e.target.files])} 
                        multiple

            />
            <div>
              <button className="cmt-rev-box-smt" onClick={ handleRating}>Submit</button>
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
          <p className="revw-fnt-bx-1">If you have used our products then you can respond with something like "I have used blue pottery plates and loved them."</p>
          <hr />
          <h6 className="revw-hd-fnt-bx"><b>Why review a product?</b></h6>
          <p className="revw-fnt-bx-1">If you review products then it will help others decide if it's good for them and matches their standards or not. It also can save someone else time and money.</p>
          <hr />
          <h6 className="revw-hd-fnt-bx"><b>How to review a product?</b></h6>
          <p className="revw-fnt-bx-1">Just share your thoughts. Start with what the product is, talk about its in the same condition and looks like this, and mention anything really good or not so good.</p>
        </div>
      </div>
    </>
  );
}