import React, { useEffect, useState } from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import "./Productdetail.css";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
// import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
// import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import Loader from "../loader/Loader";
import { ProductCard } from "../carousel/CarouselForHome";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
// import './App.css'
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

// import ShareIcon from "@mui/icons-material/Share";
import img1 from "../../assets/images/earring.jpg";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StarsIcon from "@mui/icons-material/Stars";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import deliveryicon from "../../assets/images/delivery.png";
import payicon from "../../assets/images/payicon.png";
import exchange from "../../assets/images/exchange.png";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { GlassMagnifier } from "react-image-magnifiers";
import { Helmet } from "react-helmet";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../redux/dmjSlice";

// import Switch from '@mui/material/Switch';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import InnerImageZoom from "https://cdn.skypack.dev/react-inner-image-zoom@3.0.0";
import Banner from './../Banner/Banner';

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/products";
const ratingEnd = "api/v1/Rating/count";

const getProductEnd = "api/v1/products/sku/";
const imgUrl = "https://images.diwamjewels.com/";
const typeEnd = "api/v1/products/type?type=";



// const slug = 'this is slug'
// const skuid = 'dmj@123'
// const id = localStorage.getItem("productId");

// const productEndPoint = "api/v1/products";/
var userDefaultLocation = localStorage.getItem("userLocationCode")
const ProductDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeaderCon />
      <Navbar />
      <Product />
      <Footer />
    </>
  );
};

const responsive1 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1023.99, min: 768 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 767.99, min: 0 },
    items: 2,
  },
};

// export {fetchData}

function Product() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  // const [apiCheck, setApiCheck] = useState(true);
  const [itemId, setItemId] = useState("0");

  const [itemInfo, setItemInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  const [quantity, setQuantity] = useState(2);
  const [rating, setRating] = useState("");

  const [zipCode, setZipCode] = useState(userDefaultLocation)
  const [deleveryMsg, setDeliveryMsg] = useState(null)
  const [color, setColor] = useState(null)
  const [shareIconData, setSahreIconData] = useState({
    image: null,
    desc: ''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleItemId(val) {
    // console.log(val)
    setItemId(val);
  }

  const { skuid, slug } = useParams();

  async function getProductId(skuNo) {
    try {
      const proRes = await axios.get(url + getProductEnd + skuNo);
      console.log('vzdv', imgUrl + proRes.data.data.images[0].thumbImage);
      // setSahreIconData(imgUrl + proRes.data.data.images[0].pictures)
      setSahreIconData(
        {
          ...shareIconData,
          image: proRes.data.data.images[0].pictures,
          desc: proRes.data.data.description,
        }
      )
      return proRes.data.data.id;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchRating(id) {
    try {
      const ratingRes = await axios.get(url + ratingEnd + "/" + id);
      setRating(ratingRes.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [breadcrumb, setBreadcrumb] = useState([])

  const fetchData = async () => {
    setIsLoad(true);
    if (slug && skuid) {
      // const id = await decryptProductId(pId)

      const id = await getProductId(skuid);
      await fetchRating(id);

      try {
        const res = await axios.get(url + endPoint + "/" + id);

        let parent = res.data.data.categoryId
        console.log('dvmndakvmdsc', res.data.data)

        if (parent) {
          console.log('parent')
          const breadRes = await axios.get(url + 'api/v1/category/parenttype?parenttype=' + parent)
          // console.log(breadRes.data.data)
          setBreadcrumb(breadRes.data.data)

        }
        // setSelectedImage(res.data.data.images[0]);
        // console.log(variantRes.data.data)
        // setVariant(variantRes.data.data)pae 

        dispatch(updateProduct(res.data.data.images[itemId]));
        const commaSeparatedString = await res.data.data.images[itemId]
          .pictures;
        const imgArray = commaSeparatedString.split(",");
        setSelectedImage(imgArray[0]);
        setImages(imgArray);

        setItemInfo(res.data.data);
        // console.log(res.data.data)
        setIsLoad(false);
        // setApiCheck(false)
      } catch (err) {
        console.log(err);
        setIsLoad(false);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [skuid, itemId]);

  const selectPictures = useSelector((state) => state.product.product.payload);
  // console.log(selectPictures)

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const wishList = (id) => {
    const existingCart = JSON.parse(localStorage.getItem("wishList")) || [];
    existingCart.push(id);

    localStorage.setItem("wishList", JSON.stringify(existingCart));
  };



  const addToCart = (productId) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find((item) => item.productId === productId);

    if (existingProduct) {
      // Check if the quantity is explicitly increased, otherwise set it to 1
      existingProduct.quantity = quantity > 1 ? quantity : 1;
    } else {
      const newItem = {
        productId: productId,
        quantity: quantity,
      };
      existingCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
  };



  // const location = useLocation();

  // console.log(productId)
  // console.log(id)

  const increment = () => {
    if (quantity < 6) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 2) {
      setQuantity(quantity - 1);
    }
  };

  async function handleShare() {
    const currentUrl = window.location.href;
    console.log('davgbdsafv', shareIconData.image);
    if (navigator.share) {
      navigator.share({

        text: "Checkout This Awesome Website",
        iamge: shareIconData.image,
        url: currentUrl,
        text: shareIconData.desc,
      });
    } else {
      navigator.clipboard.writeText(currentUrl);
    }
  }
  function deliveryCheck(e) {
    e.preventDefault(),
      axios.get('https://api.postalpincode.in/pincode/' + zipCode).then((res) => {
        console.log("zipCodeaPI", res);
        if (res.data[0].Status == "Success") {
          const today = new Date();
          const deliveryDate = new Date(today);
          deliveryDate.setDate(today.getDate() + 10);
          // Format the delivery date
          const options = { weekday: 'long', day: 'numeric', month: 'short' };
          const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', options);
          setDeliveryMsg('Delivery expected to' + formattedDeliveryDate)
          setColor('green')
        } else {
          setDeliveryMsg("sorry we cannot deliver to this address")
          setColor('red')
        }
      })
  }
  const handleZipCodeChangeCondition = (e) => {
    const input = e.target.value;

    // Check if the input is a numeric value and has exactly 6 digits
    if (/^\d{0,6}$/.test(input)) {
      setZipCode(input);
    }
  };
  
  return (
    <>
      {!isLoad ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{itemInfo && itemInfo.seo_title.replace(/"/g, "")}</title>
            <meta
              name="description"
              content={
                itemInfo && itemInfo.seo_description.replace(/<[^>]*>/g, "")
              }
            />
            <meta
              name="keywords"
              content={itemInfo && itemInfo.search_keywords}
            />
          </Helmet>
          <div className="container-fluid">
            <div className="mob-vw-brdcrum">
              <p className="breadcrumb-fnt-sz">

                <NavLink to="/" style={{ color: 'black', textDecoration: 'none' }}>  Home</NavLink>
                {breadcrumb.length > 0 && breadcrumb.map(b => {
                  // console.log('breadcrumb',b)
                  return (
                    <>
                      {/* / {b} */}

                      <NavLink to={`/c/${b}`} activeClassName="active" style={{ color: 'black', textDecoration: 'none' }}>/{b}</NavLink>
                    </>
                  )
                })}
                {/* /{itemInfo.name} */}
              </p>
            </div>
            <div className="row detl-page-mobvw">
              <div
                className="col-md-6 no-gutters"
                style={{ paddingRight: "0px" }}
              >
                <div className="hid-mob-view stk-box-item top-space-dt">
                  <div className="product-display">
                    <div className="carouselmini">
                      <div className="upperSmallCarousel mobile-view-dply">
                        <Swiper
                          direction={"vertical"}
                          slidesPerView={5}
                          pagination={{
                            clickable: true,
                          }}
                          Navigation={true}
                          modules={[Navigation, Pagination]}
                          className="mySwiper"
                        >
                          {images.length > 0 &&
                            images.map((image, index) => {
                              return (
                                <>
                                  <div
                                    key={index}
                                    className="smalCarouselimg"
                                    onClick={() => handleImageClick(image)}
                                  >
                                    <img
                                      src={imgUrl + image}
                                      alt={`Image ${index + 1}`}
                                    />
                                  </div>
                                </>
                              );
                            })}




                        </Swiper>
                      </div>
                    </div>
                    <GlassMagnifier
                      imageSrc={imgUrl + selectedImage}
                      imageAlt="Product"
                      largeImageSrc={imgUrl + selectedImage} // Optional
                      className="glass-magnify-sz"
                      magnifierSize={"80%"}
                      square
                    />
                  </div>
                </div>

                <div className="desktop-dis-view mobview-contdtl">
                  <div className="obtft-img-vw">
                    <img src={imgUrl + selectedImage} className="" />
                  </div>
                  <div className="share-wlst-icon">
                    <NavLink to="/wishlist">
                      <FavoriteBorderIcon className="sh-wlst-icsz" />
                    </NavLink>
                    <br />
                    <ShareIcon
                      className="sh-wlst-icsz mt-1"
                      onClick={() => handleShare()}
                    />
                  </div>

                  <div className="varient-img-box">
                    {images.length > 0 &&
                      images.map((image, index) => {
                        return (
                          <div
                            onClick={() => handleImageClick(image)}
                            key={index}
                          >
                            <img
                              src={imgUrl + image}
                              alt="varient product"
                              className="varient-imgsz"
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="col-md-6 mt-5">
                <div className="pt-mob-view">
                  <ProductPrice
                    title={itemInfo.name}
                    des={itemInfo.seo_description}
                    // manualPrice={price.manualPrice}
                    // price={price.price}
                    // discount={price.discount}
                    rating={rating}
                    variant={itemInfo.images}
                    prodes={itemInfo.description}
                    quantity={quantity}
                    // setQuantity={quantity}
                    increment={increment}
                    decrement={decrement}
                    handleItemId={handleItemId}
                  />
                  <p className="tagline-line"></p>

                  <div
                    className="mt-2 add-wishlist-btnbtm"
                    style={{ display: "flex" }}
                  >
                    <button
                      className="add-to-cart-btn-sz"
                      onClick={async () => {
                        await addToCart(itemInfo.id);
                        navigate("/addtocart");
                      }}
                    >
                      <LocalMallIcon className="prodtl-icon-sz" /> +TO CART
                    </button>

                    <button
                      className="wishlist-btn-sz"
                      onClick={async () => {
                        await wishList(itemInfo.id);
                        navigate("/wishlist");
                        window.location.reload();
                      }}
                    >
                      <FavoriteBorderIcon className="prodtl-icon-sz" /> WISHLIST
                    </button>
                  </div>

                  <div className="mt-4">
                    <h4 className="chk-del-date">Check delivery options</h4>
                    <form className="d-flex">
                      <input
                        className="form-control me-2 pin-box-int"
                        type="text" // Use type="text" to allow text input for validation
                        placeholder="Enter your zipcode"
                        maxLength={6}
                        value={zipCode}
                        onChange={handleZipCodeChangeCondition}
                      />

                      <button className="check-btn-del" onClick={deliveryCheck}>
                        Check
                      </button>
                    </form>
                    <p className="zip-code-fnt">
                      Please enter PIN code to check delivery time & Pay on
                      Delivery Availability
                    </p>
                    <div>

                      <DeliveryIcon
                        icon={deliveryicon}
                        title={deleveryMsg}
                        color={color}
                      />
                      <DeliveryIcon
                        icon={payicon}
                        title="Pay on delivery available"
                      />
                      <DeliveryIcon
                        icon={exchange}
                        title="Easy 14 days return & exchange available"
                      />
                    </div>
                  </div>

                  <p className="tagline-line"></p>
                  <div className="">
                    {/* <OfferDetails /> */}
                    <p className="tagline-line"></p>
                    <div>
                      <button
                        className="add-to-cart-btn-sz w-100"
                        onClick={async () => {
                          await addToCart(itemInfo.id);
                          navigate("/addToCart");
                        }}
                      >
                        Buy Now
                      </button>
                    </div>

                    <RatingBox />

                    <p className="tagline-line"></p>

                    <RatingComment />

                    <p className="tagline-line"></p>
                    <h6 className="text-primary">
                      <b>All 150 reviews</b>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottomdetails">
              <div className="lowerCarousel">
                <p className="mt-3">
                  <b>Related Products</b>
                </p>
              </div>

              <RelatedProduct search={itemInfo.parentType} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ height: "120vh" }}></div>
          <Loader />
        </>
      )}
    </>
  );
}

export default ProductDetails;

const ProductPrice = ({
  title,
  des,
  rating,
  variant,
  prodes,
  quantity,
  increment,
  decrement,
  handleItemId,
}) => {
  // const [variant, setVariant] = useState([])

  const [price, setPrice] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [currencyRate, setRate] = useState("80");
  const [currencyValue, setCurrencyValue] = useState("Rupee");

  async function fetchPrice() {
    if (variant[0].productVariantEntities.length > 0) {
      // await fetchCurrancy()
      if (currencyValue === "Rupee") {
        await setPrice({
          manualPrice: variant[0].productVariantEntities[0].manualPrice,
          price: variant[0].productVariantEntities[0].price,
          discount: variant[0].productVariantEntities[0].discount,
        });
      } else {
        await setPrice({
          manualPrice: (
            variant[0].productVariantEntities[0].manualPrice / currencyRate
          ).toFixed(2),
          price: (
            variant[0].productVariantEntities[0].price / currencyRate
          ).toFixed(2),
          discount: variant[0].productVariantEntities[0].discount,
        });
      }
      setSelectedColor(variant[0].productVariantEntities[0].color);
      setSelectedSize(variant[0].productVariantEntities[0].size);
    } else {
      // console.log('fired')
      await setPrice({
        manualPrice: 0,
        price: 0,
        discount: 0,
      });
      setSelectedColor("No color Added");
      setSelectedSize("No Size");
    }
  }

  async function fetchCurrancy() {
    // try{
    //   const convert = await Convert().from("USD").fetch();
    //   // console.log(convert.rates.INR)
    //   setRate(convert.rates.INR)
    // }
    // catch(err){
    //   console.log(err)
    // }
    try {
      const res = await axios.get(
        "https://v6.exchangerate-api.com/v6/b8b9cf1587f8ce9a8ab97b74/latest/USD"
      );
      setRate(res.data.conversion_rates.INR);
      // console.log(res.data.conversion_rates.INR)
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUpdateVariantId(id) {
    try {
      const res = await axios.get(url + id);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // console.log(variant)
    fetchCurrancy();
    window;

    // console.log(variant[0].productVariantEntities)
    fetchPrice();

    // console.log(price)
  }, [currencyValue, variant]);

  // async function handleVaraintSize(size) {
  //   setSelectedSize(size)
  // }

  async function handleVariantColor(color) {
    setSelectedSize(color);
  }
  async function handleShare() {
    const currentUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        text: "Checkout This Awesome Website",

        url: currentUrl,
      });
    } else {
      navigator.clipboard.writeText(currentUrl);
    }
  }
  return (
    <>
      <div>
        <h2 className="pro-detail-heading">{title.replace(/"/g, "")}</h2>
        {/* <p
          className=""
          dangerouslySetInnerHTML={{ __html: des }}
        ></p> */}

        <div className="rate-icon-box">
          <p>
            <b>4.5</b> <i className="bi bi-star-fill rate-icon-col"></i> |{" "}
            {rating} Ratings
            {/* <ShareIcon/> */}
          </p>
        </div>
      </div>
      <p className="tagline-line"></p>
      <div className="d-flex justify-content-between">
        <h4 className="price">
          MRP: {currencyValue === "Rupee" ? "₹ " : "$ "}
          {price.manualPrice}
          <span
            style={{
              textDecoration: "line-through",
              marginLeft: "8px",
              fontSize: "14px",
              color: "#7a7a7a",
            }}
          >
            {currencyValue === "Rupee" ? "₹ " : "$ "}
            {price.price}
          </span>
          <span className="off-font">( {price.discount}% OFF )</span>
        </h4>
        <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
          <ShareIcon
            className="sh-wlst-icsz mt-1"
            onClick={() => handleShare()}

          />

          <SwitchCurrency
            // currencyValue={currencyValue}
            setCurrencyValue={setCurrencyValue}
          />
        </div>
      </div>
      <p className="tax-font">Inclusive of all taxes</p>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "15px",
          alignItems: "start",
          "& > *": {
            m: 1,
          },
        }}
      >
        <div className="d-flex">
          <h5 className="mt-2 qnty-fnt-size">
            <b>Quantity :</b>
          </h5>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            style={{ marginLeft: "20px" }}
          >
            <Button
              onClick={decrement}
              style={{
                border: "solid 1px #b79d33",
                color: "black",
                borderRadius: "5px",
                marginLeft: "5px",
                fontSize: "16px",
                padding: "0px",
                boxShadow: "0",
              }}
            >
              <RemoveIcon />
            </Button>
            <Button
              style={{
                border: "solid 1px #b79d33",
                color: "black",
                borderRadius: "5px",
                marginLeft: "5px",
                fontSize: "16px",
                padding: "0px",
                boxShadow: "0",
              }}
            >
              {quantity - 1}
            </Button>
            <Button
              onClick={increment}
              style={{
                border: "solid 1px #b79d33",
                color: "black",
                borderRadius: "5px",
                marginLeft: "5px",
                fontSize: "16px",
                padding: "0px",
                boxShadow: "0",
              }}
            >
              <AddIcon />
            </Button>
          </ButtonGroup>
        </div>
      </Box>
      {/*---------------------------------------------------------------- */}
      <div className="row">
        <div className="col-md-6">
          <p className="col-fnt-sz offer-heading-txt">MORE VARIATION</p>
          <div className="color-container">
            {variant.length > 0 &&
              variant.map((img, index) => {
                return (
                  <div
                    style={
                      img.thumbImage && {
                        background: ` url(${imgUrl}${img.thumbImage})`,
                      }
                    }
                    alt="Product"
                    className="pro-color-img"
                    onClick={() => {
                      handleItemId(index);
                    }}
                  ></div>
                );
              })}
          </div>

          {/* <p className="col-fnt-sz mt-4 offer-heading-txt">SELECT SIZE</p> */}
          {/* <div style={{ display: "flex" }}>
            <p className="sel-size-active" style={{ marginLeft: "8px" }}>
              {selectedSize}
            </p>
            {variant[0].productVariantEntities.length > 0 &&
              variant[0].productVariantEntities.map((varSize) => {
                if (varSize.size !== selectedSize) {
                  return (
                    <p className="sel-size" style={{ marginLeft: "8px" }}>
                      {varSize.size}
                    </p>
                  );
                }
              })}
          </div> */}
        </div>

        {/* <div className="col-md-6 mt-2 mb-2">
          <div className="coupon-bxbdr">
            <div className="border-coupon">
              <h5 className="coupon-off-fnt">
                20% flat off on all products using HDFC Credit Card
              </h5>
              <div className="coupon-copy-button mt-4 mb-2">
                <input id="copyvalue" type="text" readonly value="GOFREE" />
                <button className="copybtn">COPY</button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <p className="tagline-line"></p>
      <AccordionTxt
        title="Product Details"
        des={<DetailsBox des={prodes} />}
        className="AccordionTxt pro-dtl-ft-sz"
      />
      <p className="tagline-line"></p>
      <AccordionTxt
        title="Dimension"
        des={
          variant[0].productVariantEntities.length > 0 && (
            <>
              {variant[0].productVariantEntities[0].product_width != 0 && (
                <p className="pro-dtl-ft-sz">
                  Width : {variant[0].productVariantEntities[0].product_width}{" "}
                  {variant[0].productVariantEntities[0].size}
                </p>
              )}
              {variant[0].productVariantEntities[0].product_heigth != 0 && (
                <p className="pro-dtl-ft-sz">
                  Height : {variant[0].productVariantEntities[0].product_heigth}{" "}
                  {variant[0].productVariantEntities[0].size}
                </p>
              )}
              {variant[0].productVariantEntities[0].product_weight != 0 && (
                <p className="pro-dtl-ft-sz">
                  Weight : {variant[0].productVariantEntities[0].product_weight}
                </p>
              )}
              {variant[0].productVariantEntities[0].product_depth != 0 && (
                <p className="pro-dtl-ft-sz">
                  Depth : {variant[0].productVariantEntities[0].product_depth}{" "}
                  {variant[0].productVariantEntities[0].size}
                </p>
              )}
            </>
          )
        }
      />

      <></>
      <p className="tagline-line"></p>

      <AccordionTxt
        title="Material"
        des={
          <>
            <h5 className="material-fnt-sz d-flex">
              <b className="mx-2">Material:</b>
              <p className="pro-dtl-ft-sz">
                {variant[0].productVariantEntities.length > 0 &&
                  variant[0].productVariantEntities[0].material}
              </p>
            </h5>
          </>
        }
      />
    </>
  );
};

const NotAvailable = () => {
  return (
    <>
      <div className="out-stock" style={{ marginLeft: "8px" }}>
        <p className="">2.8</p>
      </div>
    </>
  );
};

const DetailsBox = ({ des }) => {
  const [filterDes, setFilterDes] = useState("");

  function removeEmptyTags(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const emptyTags = tempDiv.querySelectorAll(":empty");
    emptyTags.forEach((tag) => tag.remove());

    setFilterDes(tempDiv.innerHTML);
    // return tempDiv.innerHTML;
  }

  useEffect(() => {
    removeEmptyTags(des);
  }, []);

  return (
    <>
      <div className=""></div>
      {/* <h5 className="offer-heading-txt">
        <b>Product Details</b>
      </h5> */}
      <p
        className="pro-dtl-ft-sz"
        dangerouslySetInnerHTML={{
          __html: filterDes,
        }}
      ></p>
      <div className="p-4"></div>
    </>
  );
};

function RatingBox() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5 className="mt-3 offer-heading-txt">
          <b>Ratings</b> <StarsIcon />
        </h5>
        {/* <button className="rate-prod-btn shadow-sm">Rate Product</button> */}
      </div>
      <div className="d-flex justify-content-evenly mt-4">
        <div>
          <h5 className="rating-fnt-sz-1 mt-4">
            4.5
            <i
              className="bi bi-star-fill fs-4"
              style={{ color: "#b79d33" }}
            ></i>
          </h5>
          <p className="pro-dtl-ft-sz">1.2K Verified Buyers</p>
        </div>

        <div>
          <div>
            <p className="pro-dtl-ft-sz">
              50
              <span style={{ marginLeft: "8px", color: "#b79d33" }}>
                <StarRateIcon />
                <StarRateIcon />
                <StarRateIcon />
                <StarRateIcon />
                <StarRateIcon />
              </span>
            </p>
            <p className="pro-dtl-ft-sz">
              40
              <span style={{ marginLeft: "8px", color: "#b79d33" }}>
                <StarRateIcon />
                <StarRateIcon />
                <StarRateIcon />
                <StarRateIcon />
                <StarHalfIcon />
              </span>
            </p>
            <p className="pro-dtl-ft-sz">
              35
              <span style={{ marginLeft: "8px", color: "#b79d33" }}>
                <StarRateIcon />
                <StarRateIcon />
                <StarRateIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
              </span>
            </p>
            <p className="pro-dtl-ft-sz">
              14
              <span style={{ marginLeft: "8px", color: "#b79d33" }}>
                <StarRateIcon />
                <StarRateIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
              </span>
            </p>
            <p className="pro-dtl-ft-sz">
              05
              <span style={{ marginLeft: "8px", color: "#b79d33" }}>
                <StarRateIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
                <StarOutlineIcon />
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

const RatingComment = () => {
  return (
    <>
      <div className="d-flex">
        <p className="rating-box-1">
          4.5 <i className="bi bi-star-fill rating-icon-sz"></i>
        </p>
        <p className="pro-dtl-ft-sz ms-2 mt-1">Perfect Product</p>
      </div>
      <p className="pro-dtl-ft-sz">This is an amazing Product to begin with.</p>
      <div>
        <img src={img1} alt="Product" className="pro-color-img" />
      </div>
      <div className="user-cmt-bx mt-3">
        <div className="d-flex">
          <p className="pro-dtl-ft-sz">
            Tina Singh <i className="bi bi-check-circle-fill text-muted"></i>
          </p>
          <p className="pro-dtl-ft-sz ms-1">
            Certified Buyer, Mysore 10 months ago
          </p>
        </div>
        <div className="d-flex">
          <p className="like-fnt-icon">
            450 <ThumbUpIcon className="lk-icon-sz" />
          </p>
          <p className="ms-2 like-fnt-icon">
            15 <ThumbDownIcon className="lk-icon-sz" />
          </p>
        </div>
      </div>
    </>
  );
};

const DeliveryIcon = (props) => {
  if (props.title != null) {
    return (
      <>
        <div className="d-flex">
          <img src={props.icon} alt="icon" className="img-fluid pro-icn-sz-1" />
          <p className="pro-icn-para ms-2 mt-1" style={{ color: props.color }}>{props.title}</p>      </div>
      </>
    );
  } else {
    <>
      <div className="d-flex">
        <p className="pro-icn-para ms-2 mt-1" style={{ color: props.color }}>{props.title}</p>      </div>
    </>
  }
};

const OfferDetails = () => {
  return (
    <>
      <div className="accord-item-vwindex">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <h5
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  letterSpacing: "0.75px",
                  fontFamily: "AcariSansNeueRegular",
                }}
              >
                <b>BEST OFFERS</b>
              </h5>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ marginLeft: "20px" }}>
              <h6 className="offer-heading-txt">
                <b>
                  Best Price: <span className="offer-price">Rs. 347</span>
                </b>
              </h6>
              <ul className="offer-list-fnt">
                <li>Coupon code: DMJ200</li>
                <li>
                  Coupon Discount: Rs. 77 off (check cart for final savings)
                </li>
                <li>
                  Applicable on: Orders above Rs. 1099 (only on first purchase)
                </li>
              </ul>
              <p className="offer-price">
                <b>View Eligible Products</b>
              </p>
              <h6 className="offer-heading-txt">
                <b>7.5% Instant Discount on Myntra Kotak Credit Card.</b>
              </h6>
              <ul className="offer-list-fnt">
                <li>Max Discount Up to ₹750 on every spends.</li>
              </ul>
              <p className="offer-price">
                <b>Terms & Condition</b>
              </p>
              <h6 className="offer-heading-txt">
                <b>UpTo ₹500 Cashback on CRED pay UPI transactions.</b>
              </h6>
              <ul className="offer-list-fnt">
                <li>Min Spend ₹1,000. Available only on Android Devices.</li>
              </ul>
              <p className="offer-price">
                <b>Terms & Condition</b>
              </p>
              <h6 className="offer-heading-txt">
                <b>EMI option available</b>
              </h6>
              <ul className="offer-list-fnt">
                <li>EMI starting from Rs.20/month</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

const RelatedProduct = ({ search }) => {
  const [relatedProduct, setReletedProduct] = useState([]);
  async function fetchData() {
    const defaultSearchTerm = 'blue pottery';
    const searchQuery = search || defaultSearchTerm;

    try {
      const res = await axios.get(url + typeEnd + searchQuery);
      console.log(res.data.data);

      if (res.data.data) {
        setReletedProduct(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {relatedProduct ? (
        <Carousel
          // swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive1}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          customTransition="all .5s"
          transitionDuration={500}
          containerClass="carousel-container productcard-home-sldr"
          // removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-10-px productcard-home-sldr"
          arrows={true}
        >
          {relatedProduct.map((item) => {
            {
              /* console.log(item.images.length>0&&item.images[0].productVariantEntities.length>0&&item.images[0].productVariantEntities[0].price) */
            }
            return (
              <ProductCard
                key={item.id}
                img={
                  item.images.length > 0 && imgUrl + item.images[0].thumbImage
                }
                name={item.seo_title.replace(/"/g, "")}
                category={item.name}
                id={item.id}
                price={
                  item.images.length > 0 &&
                  item.images[0].productVariantEntities.length > 0 &&
                  item.images[0].productVariantEntities[0].manualPrice
                }
                sku={item.sku}
                slug={item.slug}
              />
            );
          })}
        </Carousel>
      ) : (
        "loading.."
      )}
    </>
  );
};

export { RelatedProduct };


const SwitchCurrency = ({ setCurrencyValue }) => {
  // async function fetchCurrancy() {
  //   try {
  //     const res = await axios.get('https://v6.exchangerate-api.com/v6/b8b9cf1587f8ce9a8ab97b74/latest/USD');
  //     setRate(res.data.conversion_rates.INR)
  //     console.log(res.data.conversion_rates.INR)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
  // }

  // useEffect(() => {
  //   fetchCurrancy()
  // }, [])

  // const [currencyRate, setRate] = useState('')

  // Initialize the currency state with a default value
  const [selectedCurrency, setSelectedCurrency] = useState("Rupee");

  // Function to handle radio button change
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    setCurrencyValue(event.target.value);
  };

  // Function to perform an action when the currency is switched
  const handleCurrencySwitch = () => {
    // You can perform any action here based on the selectedCurrency state
    console.log(`Selected Currency: ${selectedCurrency}`);
  };

  return (
    <>
      <div className="leftsd-curncy-box">
        <div className="switches-container">
          <input
            type="radio"
            id="switchRupee"
            name="switchPlan"
            value="Rupee"
            checked={selectedCurrency === "Rupee"}
            onChange={handleCurrencyChange}
          />
          <input
            type="radio"
            id="switchDolar"
            name="switchPlan"
            value="Dolar"
            checked={selectedCurrency === "Dolar"}
            onChange={handleCurrencyChange}
          />
          <label for="switchRupee">
            <i className="bi bi-currency-rupee"></i>
          </label>
          <label for="switchDolar">
            <i className="bi bi-currency-dollar"></i>
          </label>
          <div className="switch-wrapper">
            <div className="switch">
              <div>
                <i className="bi bi-currency-rupee"></i>
              </div>
              <div>
                <i className="bi bi-currency-dollar"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AccordionTxt = ({ title, des }) => {
  return (
    <>
      <div className="accord-item-vwindex">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <h5
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  letterSpacing: "0.75px",
                  fontFamily: "AcariSansNeueRegular",
                }}
              >
                {title}
              </h5>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ marginLeft: "30px" }}>{des}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};


function BuyNowLoader() {
  return (
    <>
      please wait ...
    </>
  )
}
