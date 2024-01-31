import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import "./orderpage.css";
import { format } from "date-fns";
// import coins from "../../assets/images/coins.png";
// import supercoins from "../../assets/images/supercoins.png";
// import productimage from "../../assets/images/earring1.jpg";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarsIcon from "@mui/icons-material/Stars";
import HelpIcon from "@mui/icons-material/Help";
import WidgetsIcon from "@mui/icons-material/Widgets";
// import companyicon from "../../assets/images/companyicon.png";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";



const OrderDetail = () => {
  const [productDetails, setProductDetails] = useState();
  const [productShipping, setProductShipping] = useState([]);
  const [timeLineDate, setTimelineDate] = useState();
  const [isOrderShipped, setIsOrderShipped] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, []);
  const { order_Id } = useParams();
  const url = "https://api.diwamjewels.com/DMJ/";

  const imgUrl = "https://images.diwamjewels.com/";

  function fetchProduct() {
    axios.get(url + "api/v1/order/" + order_Id).then((res) => {
      // console.log(res.data.data);
      setTimelineDate(res.data.data.created_at);
      setProductDetails(res.data.data);
    });
    axios.get(url + "api/v1/orderdetails/getOrders/" + order_Id).then((res) => {
      // console.log(res.data.data);
      setProductShipping(res.data.data);
    });
    axios.get(url + "api/v1/order/status/orderId/" + order_Id).then((res) => {
      const latestStatus = res.data.data[3];
      
      setIsOrderShipped(latestStatus && latestStatus.statusDetailsModel.status === "Delivered");
    });
   
  }
  const originalDate = new Date(timeLineDate);

  // Apply the UTC offset for IST (UTC+5:30)
  originalDate.setUTCHours(originalDate.getUTCHours() + 5);
  originalDate.setUTCMinutes(originalDate.getUTCMinutes() + 30);
  
  const formattedDate = originalDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <>
      <HeaderCon />
      <Navbar />
      <OrderDelivery orderData={productDetails} ID={order_Id} isOrderShipped={isOrderShipped} />
      <DeliveryTimeline
        productShipping={productShipping}
        order_Id={order_Id}
        timeLineDate={formattedDate}
      />
      <Footer />
    </>
  );
};
export default OrderDetail;

const OrderDelivery = ({ orderData , ID, isOrderShipped}) => {
 
  return (
    <>
      <div className="container">
        <p className="id-tag-fnt">
          Home / My Account / My Orders / {orderData && orderData.orderNumber}
        </p>
        <div className="rate-rev-frm shadow">
          <div className="row">
            <div className="col-md-3">
              <CustomerAddress
                orderAddress={orderData && orderData.addressModel}
              />
            </div>
            <div className="col-md-3">
            </div>
            <div className="col-md-3">
              <div className="text-center mt-4">

              
              {isOrderShipped ? ( 
                <NavLink to={`/invoice/${ID}`}>
                  <button className="invce-btn-1"> Invoice</button>
                </NavLink>

              ) : (
                <>
                  
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CustomerAddress = ({ orderAddress }) => {
  // console.log(orderAddress);
  return (
    <>
      <h6 className="reward-heading">Delivery Address</h6>
      <p className="coin-hd-fnt-1">{orderAddress && orderAddress.name}</p>
      <p className="customer-add-fnt">
        {/* House No. , street Name, lane No. Jaipur */}
        {orderAddress && orderAddress.area}, {orderAddress && orderAddress.city}
        -{orderAddress && orderAddress.pincode},{" "}
        {orderAddress && orderAddress.state}
      </p>
      <h6 className="coin-hd-fnt-1">Phone Number</h6>
      <p className="customer-add-fnt">
        {orderAddress && orderAddress.mobile},
        {orderAddress && orderAddress.alternateNumber}
      </p>
    </>
  );
};

const Rewards = (props) => {
  return (
    <>
      <div className="d-flex">
        <img
          src="https://plus.unsplash.com/premium_photo-1679768606622-966613f7b22f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGdvbGQlMjBjb2luc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="coins"
          className="coins-sz-1"
        />
        <div className="ms-2">
          <h6 className="coin-hd-fnt-1">{props.heading}</h6>
          <p className="coin-para-fnt-1">{props.description}</p>
        </div>
      </div>
    </>
  );
};

const DeliveryTimeline = ({ productShipping, order_Id, timeLineDate }) => {
  return (
    <>
      <div className="container mt-3 mb-3">
        <div className="rate-rev-frm shadow">
          <div className="row">
            <div className="col-md-5">
              {productShipping &&
                productShipping.map((item, index) => {
                  const imgUrl =
                    "https://images.diwamjewels.com/";
                  return (
                    <ProductOrderDetails
                      image={imgUrl + item.productImagesModel.thum_image}
                      name={item.name}
                      price={item.amount}
                      color={item.color}
                    />
                  );
                })}
            </div>
            <div className="col-md-4">
              <TimelineView order_Id={order_Id} timeLineDate={timeLineDate} />
            </div>

            <div className="col-md-3 mt-5">
              <RateHelpBox />
            </div>
          </div>
          <div className="item-dlry-fnt-sz">
            <p>
              <WidgetsIcon /> Item was opened and verified at the time of
              delivery.
            </p>
          </div>
        
        </div>
      </div>
    </>
  );
};

const ProductOrderDetails = (props) => {
  return (
    <>
      <div className="d-flex mb-4">
        <img
          src={props.image}
          alt="product"
          className="pro-color-img"
        />
        <div className="ms-3">
          <h6 className="coin-hd-fnt-1">{props.name}</h6>
          <p className="coin-para-fnt-1">color: {props.color}</p>
          <p className="coin-para-fnt-1" style={{ marginTop: "-10px" }}>
            Seller: DMJ
          </p>
          <h5 className="tl-rupee-fnt">
            <CurrencyRupeeIcon className="tl-rupee-icon" />
            {props.price}
          </h5>
          {/* <p className="tl-delvry-offer">2 Offers Applied</p> */}
        </div>
      </div>
    </>
  );
};
const TimelineView = ({ order_Id, timeLineDate }) => {
  const [timeLine, setTimeLine] = useState([]);
  const [orderDate, setOrderDate] = useState( );
 

  function timeLineColor() {
    const url = "https://api.diwamjewels.com/DMJ/api/v1/order/status/orderId/";
    return axios.get(url + order_Id).then((res) => {
      // console.log(res.data.data);
      setTimeLine(res.data.data);
    });
  }
 
 
  useEffect(() => {
    timeLineColor();
  }, []);
  return (
    <>
      {timeLine.length > 0 ? (
        timeLine.map((item, index) => {
          // console.log(item);
          const originalDate = new Date(item.date);

          // Apply the UTC offset for IST (UTC+5:30)
          originalDate.setUTCHours(originalDate.getUTCHours() + 5);
          originalDate.setUTCMinutes(originalDate.getUTCMinutes() + 30);
          
          const formattedDate = originalDate.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            hour12: true,
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
           
           
          });
          return (
          
            <div className="tracking-item">
                              <div className="tracking-icon status-intransit">
                                <svg
                                  className="svg-inline--fa fa-circle fa-w-16"
                                  aria-hidden="true"
                                  data-prefix="fas"
                                  data-icon="circle"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  data-fa-i2svg=""
                                >
                                  <path
                                    fill="currentColor"
                                    d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
                                  ></path>
                                </svg>
                              </div>
                            
                              <div className="tracking-content">
                                
                              <h4 className="dlry-tel-hd-fnt">
                   {item.statusDetailsModel.status}
                  </h4>
                <p className="ord-dlry-tel-para ">
                {item.statusDetailsModel.description}
                 </p>
              {item.logisticName && (
                 <p className="ord-dlry-tel-para">
                    Logistic Name: {item.logisticName}
                    </p>
               )}
               {item.trackingId && (
                   <p className="ord-dlry-tel-para">
                     TrackingNo: {item.trackingId}
                  </p>
                 )}
              <p className="ord-dlry-tel-para">
                Date: {formattedDate ? formattedDate : item.date}
                </p>
                               
                              </div>
                            </div>
          );
        })
      ) : (


        
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success" />
              <TimelineConnector />
            </TimelineSeparator>

            <TimelineContent>
              <h4 className="dlry-tel-hd-fnt">Order Booked</h4>
              <p className="ord-dlry-tel-para ">Your order has been booked</p>
              <p className="ord-dlry-tel-para">Date: {timeLineDate}</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      )}
    </>
  );
};

const RateHelpBox = () => {
  return (
    <>
      <h6 className="tl-rate-help-clr">
        <StarsIcon className="hprate-icon" /> Rate & Review Product
      </h6>
      <h6 className="tl-rate-help-clr">
        <HelpIcon className="hprate-icon" /> Need help?
      </h6>
    </>
  );
};
