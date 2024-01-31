import React from "react";
// import { NavLink } from 'react-router-dom';
import deliveryimg from "./box.png";
import productimg from "./product.png";
import "./dashboard.css";
import Details from "./Orderdetails";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarRateIcon from "@mui/icons-material/StarRate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import OrderDetail from "../order-page/OrderDetail";
import { Link } from "react-router-dom";
import orderimage from "../../assets/images/orderimage.png";

var userId = localStorage.getItem("userId");

const url = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://images.diwamjewels.com/";

const Orderpage = () => {
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState();

  async function fetchOrder() {
    try {
      const orderData = await axios.get(
        url + "api/v1/orderdetails/getOrderWithUserId?userId=" + userId
      );

      // console.log(orderData.data.data)
      setOrderData(orderData.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <>
      <div className="sidebar-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/* Assuming <Filter /> is a component you might want to include later */}
              {/* <Filter /> */}

              {orderData.length > 0 ? (
                <div className="order-info">
                  <div className="order-desktopvw">
                    {orderData.length > 0 &&
                      orderData.map((item, index) => {
                        function timeLineColor(orderId) {
                          const url =
                            "https://api.diwamjewels.com/DMJ/api/v1/order/status/orderId/";
                          return axios.get(url + orderId).then((res) => {
                            console.log(res.data.data);
                          });
                        }
                        timeLineColor(item.orderId);

                        return (
                          <Link
                            to={"/OrderDetail/" + item.orderId}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Ordercard
                              status={
                                item.statusEntity.length > 0
                                  ? item.statusEntity[
                                      item.statusEntity.length - 1
                                    ].statusDetailsModel.status
                                  : "Booked "
                              }
                              description={
                                item.statusEntity.length > 0
                                  ? item.statusEntity[
                                      item.statusEntity.length - 1
                                    ].statusDetailsModel.description
                                  : "Booked"
                              }
                              key={index}
                              disPrice={item.amount}
                              price={item.amount}
                              color={item.color}
                              image={item.productImagesModel.thum_image}
                              name={item.name}
                            />
                          </Link>
                        );
                      })}
                  </div>

                  <div className="ordered-mobviw">
                    {orderData.length > 0 &&
                      orderData.map((item, index) => {
                        return (
                          <Link
                            to={"/OrderDetail/" + item.orderId}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <OrderListCardMob
                              status={
                                item.statusEntity.length > 0
                                  ? item.statusEntity[
                                      item.statusEntity.length - 1
                                    ].statusDetailsModel.status
                                  : "Booked "
                              }
                              description={
                                item.statusEntity.length > 0
                                  ? item.statusEntity[
                                      item.statusEntity.length - 1
                                    ].statusDetailsModel.description
                                  : "Booked"
                              }
                              key={index}
                              disPrice={item.amount}
                              price={item.price}
                              color={item.color}
                              image={item.productImagesModel.thum_image}
                            />
                          </Link>
                        );
                      })}
                    {/* <OrderListCardMob /> */}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-5 text-center order-pro-dtl-img">
                    <img
                      src={orderimage}
                      alt="order image"
                      className="img-fluid order-pr-dtl-shw"
                    />
                  </div>
                  <div className="mt-5">
                    <h4 className="mt-3 text-center">
                      <b>Nothing here...yet</b>
                    </h4>
                    <p className="text-center">
                      <b>Please Order Some Products</b>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Assuming <Details /> is a component you might want to include later */}
      {/* <Details /> */}
    </>
  );
};

export default Orderpage;

class Filter extends React.Component {
  render() {
    return (
      <>
        <div className="order-view mt-5">
          <form action="" className="d-flex">
            <input
              type="text"
              placeholder="Search your orders here ..."
              className="form-control ord-search-int"
            />
            <button className="srch-ord-btnvew" type="submit">
              Search
            </button>
          </form>
        </div>
      </>
    );
  }
}

const Ordercard = ({
  disPrice,
  price,
  color,
  image,
  name,
  status,
  description,
}) => {
  return (
    <>
      <div className="ordered-prdctbox mt-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <div className="ord-prdct-img-boxv">
              <img
                src={imgUrl + image}
                alt="product"
                className="ord-product-imgvw"
              />
            </div>

            <div className="ms-3">
              <p className="prd-namefnt"> {name}</p>
              <p className="prd-clr-type">Color: {color} </p>
            </div>
          </div>

          <div>
            <h6 className="ord-price-pro">
              <CurrencyRupeeIcon className="rupee-icn-frpr" />
              {price}
            </h6>
          </div>

          <div>
            <h6 className="dlry-date-fnts">
              <FiberManualRecordIcon
                className="rupee-icn-frpr"
                style={{ color: "#0aa847" }}
              />
              {status === null ? (
                <>Orderd Booked</>
              ) : (
                <> Your Orderd {status}</>
              )}
            </h6>
            <p className="prd-clr-type">
              {description === null ? (
                <>Your item has been Booked </>
              ) : (
                <>{description}</>
              )}
            </p>
            {/* <p className="rate-fntsz-vw">
              <StarRateIcon style={{ fontSize: "20px" }} /> Rate & Review
              Product
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

const OrderListCardMob = ({
  disPrice,
  price,
  color,
  image,
  status,
  description,
}) => {
  return (
    <>
      <div className="mob-vw-ordlist mt-2 mb-2">
        <div className="d-flex justify-content-between">
          <div className="ord-prdct-img-boxv">
            <img
              src={imgUrl + image}
              alt="product"
              className="ord-product-imgvw"
            />
          </div>

          <div className="mt-3">
            <h3 className="dlry-date-fnts">
              {status === null ? (
                <>Orderd Booked</>
              ) : (
                <> Your Orderd {status}</>
              )}
            </h3>
            <h6 className="dlry-date-fnts">
              {description === null ? (
                <>Your item has been Booked </>
              ) : (
                <>{description}</>
              )}
            </h6>

            <p className="prd-namefnt">{disPrice}</p>
          </div>

          <div className="mt-4">{/* <NavigateNextIcon /> */}</div>
        </div>

        <div className="d-flex justify-content-between">
          {/* <p className="rate-fntsz-vw">
            Rate & Review
            Product
          </p> */}
          <div>
            <StarOutlineIcon /> <StarOutlineIcon /> <StarOutlineIcon />{" "}
            <StarOutlineIcon /> <StarOutlineIcon />
          </div>
        </div>
      </div>
    </>
  );
};
