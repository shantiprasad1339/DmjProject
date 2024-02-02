import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import "./checkout.css";
import indialogo from "./images/indialogo.png";
import Form from "react-bootstrap/Form";
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import creditcard from "./images/credit.png";
import paypal from "./images/paypal.png";
import upilogo from "../../assets/images/bhim.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import AddIcon from "@mui/icons-material/Add";
import { Select } from "@mui/material";
import PopUp from "../popup/PopUp";
import { NavLink } from "react-router-dom";
import Payment from "../payment/payment";
import { useDispatch } from "react-redux";
import { setProductData } from "../redux/dmjSlice";

const url = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://images.diwamjewels.com/";
// const endPoint = 'api/v1/products/';
const productEndPoint = "api/v1/products";
const endPoint = "api/v1/user/";

const userId = localStorage.getItem("userId");

var cart = JSON.parse(localStorage.getItem("cart")) || [];
const CheckoutPage = () => {
  const [userInfo, setUserInfo] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAge, setUserAge] = useState("");

  async function handleSetAddress(val) {
    setAddressId(val);
  }

  async function fetchUserData() {
    try {
      const res = await axios.get(url + endPoint + userId);
      // console.log(res.data.data)
      setUserInfo(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }
  function userDetailsAddress() {
    axios.get(url + endPoint + userId).then((res) => {
      // console.log("userAddress",res.data.data);
      setUserName(res.data.data.userName);
      setUserGender(res.data.data.gender);
      setUserEmail(res.data.data.email);
      setUserPhone(res.data.data.phoneNumber);
      setUserAge(res.data.data.age);
    });
  }

  useEffect(() => {
    fetchUserData();
    userDetailsAddress();
    window.scrollTo(0, 0);    // console.log("cart", cart);
  }, []);

  return (
    <>
      <HeaderCon />
      <Navbar />

      {userId ? (
        <div className="checkout-bg">
          <div className="container-fluid">
            <div className="row fl-dirt-col">
              <div className="col-md-7 mt-3">
                <DeliveryCountry />
                {/* <PromoCode /> */}
                <EmailAddress
                  email={userInfo ? userInfo.email : "Login For Buy Now"}
                />
                <Accordion defaultActiveKey="0" className="mt-2">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header className="hd-tag-font">
                      Delivery Address
                    </Accordion.Header>
                    <Accordion.Body>
                      <DlryAddress handleSetAddress={handleSetAddress} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                {/* <Accordion className="mt-2">
                <Accordion.Item eventKey="1">
                  <Accordion.Header className="hd-tag-font">
                    Shipping Address
                  </Accordion.Header>
                  <Accordion.Body>
                    <DlryAddress
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}

                <DlryOptions />

                {/* <PaymentType /> */}
              </div>

              <div className="col-md-5 mt-3">
                <CheckoutItem addressId={addressId} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PopUp />
      )}
      {/* <Payment /> */}
      <Footer />
    </>
  );
};

export default CheckoutPage;

const DeliveryCountry = () => {
  const [countryList, setCountryList] = useState([]);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    axios
      .get("http://restcountries.com/v3.1/all")
      .then((res) => {
        // console.log(res)
        setCountryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCountryLogo(name) {
    axios
      .get(`http://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        // console.log(res.data[0].flags.png)
        setFlag(res.data[0].flags.png);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function handleSelectCountry(e) {
    const countryName = await e.target.value;

    handleCountryLogo(countryName);
  }
  return (
    <>
      <div className="del-ct-bg">
        <h3 className="hd-tag-font">DELIVERY COUNTRY</h3>

        <div className="ct-box">
          <img
            src={flag ? flag : indialogo}
            alt="country"
            className="cnt-logo"
          />
          <Form.Select className="sel-box" onChange={handleSelectCountry}>
            <option>India</option>
            {countryList.map((country, index) => {
              return <option key={index}>{country.name.common}</option>;
            })}
          </Form.Select>
        </div>
      </div>
    </>
  );
};

const PromoCode = () => {
  return (
    <>
      <div className="del-ct-bg mt-2">
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="hd-tag-font">
              PROMO / CODE OR VOUCHERS
            </Accordion.Header>
            <Accordion.Body>
              <form action="" className="d-flex p-2">
                <input
                  type="text"
                  className="input-box-bdr"
                  placeholder="Enter your promo code"
                />
                <button className="check-verify-btn">Verify</button>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

const EmailAddress = ({ email }) => {
  return (
    <>
      <div className="del-ct-bg mt-2">
        <h3 className="hd-tag-font">EMAIL ADDRESS</h3>
        <p className="em-add-font">{email}</p>
      </div>
    </>
  );
};

const DlryAddress = ({ handleSetAddress }) => {
  // const { delivery, setDelivery } = props;
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [delivery, setDelivery] = useState([
    {
      fName: "",
      lName: "",
      mobileNo: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      hometype: "",
    },
  ]);
const [postalcode,setPostalcode] = useState()
  const [isHomeChecked, setIsHomeChecked] = useState(false);
  const [isOfficeChecked, setIsOfficeChecked] = useState(false);

  function getUserLocation(postalCode) {
    const zipodeApi = "https://shark-app-cnaaz.ondigitalocean.app/api/data/"
    const pin = postalCode

    setDelivery({ ...delivery, postalCode: pin });
    setPostalcode(pin)
console.log("pin =====>>>",pin);
    axios
      .get(zipodeApi+postalCode)
      .then((res) => {
        console.log("userDetails ======>>>>", res.data);
        setDelivery({
          ...delivery,
          city: res.data.data.District,
          state: res.data.data.StateName
        });
      });
  }

  function userDetailsAddress() {
    axios.get(url + endPoint + userId).then((res) => {
      setDelivery({
        ...delivery,
        fName: res.data.data.userName,
        mobileNo: res.data.data.countryCode + res.data.data.phoneNumber,
      });
    });
  }

  useEffect(() => {
    userDetailsAddress();
    // console.log("cart", cart);
  }, []);

  const handleCheckboxChange = (e) => {
    if (e.target.name === "home") {
      setIsHomeChecked(!isHomeChecked);
      setIsOfficeChecked("false"); // Uncheck "Office"
    } else if (e.target.name === "office") {
      setIsOfficeChecked(!isOfficeChecked);
      setIsHomeChecked(false); // Uncheck "Home"
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const apiUrl = url + "api/v1/address";
      const requestData = {
        name: `${delivery.fName}`,
        pincode: parseInt(delivery.postalCode),
        state: delivery.state,
        city: delivery.city,
        area: delivery.address,
        country: selectedCountry,
        mobile: delivery.mobileNo,
        alternateNumber: delivery.mobileNo,
        addType: delivery.hometype,
        userId: userId, // Replace with the actual user ID
      };

      const response = await axios.post(apiUrl, requestData);

      if (response.status === 200) {
        alert("Address added successfully:");
        // The request was successful, you can handle the success here
        console.log("Address added successfully:", response.data);
        window.location.reload();
        // Optionally, you can reset the form or perform any other actions
      } else {
        // Handle other response statuses if needed
        console.error("Failed to add address:", response);
      }
    } catch (err) {
      // Handle any errors that occur during the request
      console.error("API Error:", err);
    }
  }

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDelveryNewAddress, setNewDelveryAddress] = useState(false);

  useEffect(() => {
    const apiUrl = url + "api/v1/address/userId/" + userId; // Update with your API URL

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          handleSetAddress(response.data.data[0].id);
          setDeliveryOptions(response.data.data);
          setNewDelveryAddress(false);
        } else {
          // Handle other response statuses if needed
          console.error("Failed to fetch delivery options:", response);
        }
      })
      .catch((error) => {
        setDeliveryOptions([]);
        setNewDelveryAddress(true);
        // Handle any errors that occur during the request
        console.error("API Error:", error);
      });
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="del-ct-bg mt-2">
      <RadioGroup
  aria-labelledby="demo-radio-buttons-group-label"
  defaultValue={deliveryOptions.length > 0 ? deliveryOptions[0].id : undefined}
  name="radio-buttons-group"
>
  <div className="del-ct-bg mt-2">
    <h3 className="hd-tag-font">DELIVERY OPTIONS</h3>
    {deliveryOptions.length > 0 &&
      deliveryOptions.map((option) => {
        // console.log("option =====>>>>", option);
        return (
          <RateOptions
            key={option.id}
            rate={option.name}
            dlryname={option.area}
            required
            date={option.mobile}
            isSelected={option === selectedOption}
            onOptionSelect={() => handleOptionSelect(option)}
          />
        );
      })}
  </div>
</RadioGroup>



        <h3
          className="hd-tag-font"
          style={{
            color: "white",
            cursor: "pointer",
            backgroundColor: "black",
            width: "200px",
            fontSize: "13px",
            fontWeight: "500",
            textAlign: "center",
            paddingLeft: "15px",
            paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
            borderRadius: "5px",
          }}
          onClick={() => {
            setNewDelveryAddress(!isDelveryNewAddress);
          }}
        >
          <AddIcon /> ADD NEW ADDRESS
        </h3>

        {isDelveryNewAddress && (
          <>
            <h3 className="hd-tag-font">DELIVERY ADDRESS</h3>
            <form onSubmit={handleSubmit}>
              <FormLabel className="fm-lbl-heading">Full NAME </FormLabel>
              <br />
              <Input
                type="text"
                className="input-box-bdr mt-1"
                required
                value={delivery.fName}
                onChange={(e) =>
                  setDelivery({ ...delivery, fName: e.target.value })
                }
              ></Input>
              <br />

              <FormLabel className="fm-lbl-heading">MOBILE </FormLabel>
              <br />
              <Input
                type="number"
                className="input-box-bdr mt-1"
                required
                value={delivery.mobileNo}
                onChange={(e) => {
                  const mobileNo = e.target.value.slice(0, 10); // Limit input to 10 digits
                  setDelivery({ ...delivery, mobileNo });
                }}
              ></Input>
              <br />
              <FormLabel className="fm-lbl-heading">POSTAL CODE </FormLabel>
              <br />
              <Input
                type="number"
                className="input-box-bdr mt-1"
                value={postalcode}
                onChange={(e) => getUserLocation(e.target.value)}
              ></Input>
              <br />
              <FormLabel className="fm-lbl-heading">ADDRESS </FormLabel>
              <br />
              <Input
                type="text"
                className="input-box-bdr mt-1"
                required
                value={delivery.address}
                onChange={(e) =>
                  setDelivery({ ...delivery, address: e.target.value })
                }
              ></Input>
              <br />
              <FormLabel className="fm-lbl-heading">CITY </FormLabel>
              <br />
              <Input
                type="text"
                className="input-box-bdr mt-1"
                required
                value={delivery.city}
                onChange={(e) =>
                  setDelivery({ ...delivery, city: e.target.value })
                }
              ></Input>
              <br />
              <FormLabel className="fm-lbl-heading">STATE </FormLabel>
              <br />
              <Input
                type="text"
                className="input-box-bdr mt-1"
                required
                value={delivery.state}
                onChange={(e) =>
                  setDelivery({ ...delivery, state: e.target.value })
                }
              ></Input>
              <br />

              <FormLabel className="fm-lbl-heading">COUNTRY</FormLabel>
              <br />
              <select
                className="input-box-bdr mt-1"
                required
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="India">India</option>
                {/* <option value="USA">USA</option> */}
              </select>
              <br />

              <FormLabel className="fm-lbl-heading">Select Home Type</FormLabel>
              <br />
              <select
                className="input-box-bdr mt-1"
                required
                value={delivery.hometype}
                onChange={(e) =>
                  setDelivery({ ...delivery, hometype: e.target.value })
                }
              >
                <option value="">Select Any Option</option>
                <option value="office">Office</option>
                <option value="Home">Home</option>
              </select>

              <Button className="dlry-btn" type="submit">
                DELIVER TO THIS ADDRESS
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

const DlryOptions = () => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const apiUrl = url + "api/v1/address/userId/" + userId; // Update with your API URL

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.status === 200) {
          // Store the delivery options in state
          setDeliveryOptions(response.data.data);
          // console.log(response.data.data)
        } else {
          // Handle other response statuses if needed
          console.error("Failed to fetch delivery options:", response);
        }
      })
      .catch((error) => {
        setDeliveryOptions([]);
        // Handle any errors that occur during the request
        console.error("API Error:", error);
      });
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return <></>;
};

const RateOptions = (props) => {
  return (
    <>
      <div className="ct-box mt-4">
        <input
          type="radio"
          value={props.id}
          checked={props.isSelected}
          onChange={props.onOptionSelect}
          className="check-radio"
          required
        />
        <div>
          <div className="d-flex">
            <h6 className="pay-font-sz">{props.rate}</h6>
            <h6 className="wrk-place-fnt">Home</h6>
            <p className="dlr-wrk-numft">{props.date}</p>
          </div>
          <h6 className="dlry-wrkadd-fntsz">{props.dlryname}</h6>
        </div>
      </div>
    </>
  );
};

const PaymentType = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <form action="">
        <Accordion className="mt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="d-flex">
                <img src={creditcard} alt="credit" className="cr-cd-img" />
                <h6 className="opt-dlry-fnt mt-1">ADD CREDIT / DEBIT CARD</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="p-2">
                <div className="row">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="input-box-bdr mt-2 w-100"
                      placeholder="Card Holder Name"
                      name="cardHolderName"
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="input-box-bdr mt-2 w-100"
                      placeholder="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className="input-box-bdr mt-2 w-100"
                      placeholder="Expiration Date"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="input-box-bdr mt-2 w-100"
                      placeholder="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="hd-tag-font">
              <div className="d-flex">
                <img src={upilogo} alt="credit" className="cr-cd-img" />
                <h6 className="opt-dlry-fnt mt-1">UPI ID</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex p-2">
                <input
                  type="text"
                  className="input-box-bdr"
                  placeholder="Enter UPI ID"
                />
                <button className="check-verify-btn">Verify</button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="hd-tag-font">
              <div className="d-flex">
                <img src={paypal} alt="credit" className="cr-cd-img" />
                <h6 className="opt-dlry-fnt mt-1">Paypal ID</h6>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex p-2">
                <input
                  type="text"
                  className="input-box-bdr"
                  placeholder="Enter Paypal ID"
                />
                <button className="check-verify-btn">Verify</button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </form>
    </>
  );
};

const AccountCardType = (props) => {
  return (
    <>
      <div className="ct-box cr-cd-box mt-4">
        <img src={props.cardimg} alt="credit" className="cr-cd-img" />
        <h6 className="opt-dlry-fnt mt-1">{props.cardname}</h6>
      </div>
    </>
  );
};

const CheckoutItem = ({ addressId }) => {
  // const [totalPrice, setTotal] = useState(0);
  const totalPrice = JSON.parse(localStorage.getItem("total"));
  // const [disTotal, setDisTotal] = useState(0);
  const disTotal1 = JSON.parse(localStorage.getItem("discounttotal"));
  const disTotal = totalPrice - disTotal1;
  const [deliveryCharges, setDeliveryCharges] = useState(150);
  const [proDetails, setProDetails] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [checkOutProducts, setProducts] = useState();
  const [productDetails, setProductDetails] = useState([]);
  const { name, price } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  async function fethcProductData(id) {
    // console.log(id)
    try {
      const res = await axios.get(url + productEndPoint + "/" + id);
      setProDetails((items) => [...items, res.data.data]);

      console.log("i want product detailpart1", proDetails);
      setIsUpdate(true);
    } catch (err) {
      console.log(err);
    }
  }

  const [proQuant, setProQuanty] = useState("");

  async function handleAllPrice(item1) {
    console.log(item1);
    setProQuanty(cart);

    // let total = 0;
    // let discountTotal = 0;
    let quanti = [];

    //   cart.map(async (cartItem) => {
    //       setQuantity(cartItem.quantity);
    //       const matchingItem = item1.find((item) => item.id === cartItem.productId);
    // console.log("matchingItem", matchingItem);
    //       const productPrice = parseInt(
    //         matchingItem.images[0].productVariantEntities[0].price
    //       );
    //       const productManualPrice = parseInt(
    //         matchingItem.images[0].productVariantEntities[0].manualPrice
    //       );

    //       total += productPrice * (cartItem.quantity - 1);
    //       discountTotal += productManualPrice * (cartItem.quantity - 1);
    //       quanti.push(cartItem.quantity);

    //   setTotal(total);

    //   setDisTotal(discountTotal);
    // })
  }

  useEffect(() => {
    // cart = JSON.parse(localStorage.getItem("cart")) || [];
    window.scrollTo(0, 0);

    console.log("cartData", cart);
    // setAdtCart(cart)
    cart.map((id) => fethcProductData(id.productId));
  }, [isUpdate]);

  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedProducts = cart.map((cartItem) => {
      const productDetail = proDetails.find(
        (detail) => detail.id === cartItem.productId
      );
      return {
        name: productDetail?.seo_title || "Unknown",
        quantity: cartItem.quantity || 0,
        image: productDetail?.images[0].thumbImage || "",
        price: productDetail?.images[0].productVariantEntities[0].price || 0,
        amount:
          productDetail?.images[0].productVariantEntities[0].manualPrice ?? 0,
        discount:
          productDetail?.images[0].productVariantEntities[0].discount || 0,
        productVariantId:
          productDetail?.images[0].productVariantEntities[0].id || 0,
      };
    });

    setProductDetails(selectedProducts);
  }, [proDetails]);

  async function newProductAdd(order, orderId) {
    // console.log("order", order,"orderId", orderId);
    try {
      // Use setTimeout to delay execution by 1 second

      const res = await axios.post(url + "api/v1/orderdetails", order);
      console.log(res);

      if (res.data.status === "OK") {
        // alert("Order Added Successfully ")
        // navigate("/payment/" + orderId);

        window.location.href = 'https://lobster-app-d9ye4.ondigitalocean.app/#/pay/' + orderId;
        localStorage.removeItem("cart")
      }
    } catch (err) {
      console.error("Error adding order details:", err);
    }
  }

  // console.log("productDetails",productDetails);
  async function placeOrder(orderId) {
    productDetails.forEach((item, index) => {
      let order = {
        amount: Number(item.amount) * (item.quantity - 1) + 150,
        price: item.price,
        discount: item.discount,
        quantity: item.quantity - 1,
        productVarintId: item.productVariantId,
        orderId: orderId,
      };

      newProductAdd(order, orderId);
    });
    // console.log('placeOrder')
  }

  const createNewOrder = async () => {
    const orderData = {
      userId: userId,
      price: totalPrice,
      addressId: addressId,
      amount: totalPrice - disTotal + deliveryCharges,
      discount: disTotal,
    };
    // console.log(orderData)
    try {
      // Define the data to be sent
      console.log("orderData", orderData);

      // Make a POST request using Axios
      const response = await axios.post(url + "api/v1/order", orderData);
      // console.log("response",response);
      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Request was successful
        placeOrder(response.data.data);
        // console.log('Order data sent successfully:', response.data);
      } else {
        // Handle errors here

        console.error("Error sending order data:", response.status);
      }
    } catch (error) {
      // Handle any exceptions
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fethcProductData();
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.map((id) => fethcProductData(id.productId));
    setProDetails([]);
    handleAllPrice(proDetails);
  }, []);

  return (
    <>
      <div className="del-ct-bg stk-box-item">
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Price Details</h6>
          <h6
            className="opt-dlry-fnt"
            onClick={() => navigate("/addToCart")}
            style={{ cursor: "pointer" }}
          >
            EDIT
          </h6>
        </div>
        {/* <hr /> */}
        {/* { productDetails.length > 0 ?
          productDetails.map((item, index) => (
          
              <div className="ct-box mt-4" key={item.id}>
                <img
                  src={
                    imgUrl + item.image
                  }
                  alt="item"
                  className="ck-item-img"
                /> 
                <div className="">
                  <h3 className="hd-tag-font opt-dlry-fnt">
                    <i className="bi bi-currency-rupee"></i>
                    {item.price}
                  </h3>
                  <p className="item-pro-font opt-dlry-fnt">{item.name}</p>
                  <h2 className="opt-dlry-fnt">
                  
                  </h2>
                      <h2 className="opt-dlry-fnt"> Qty : {proQuant[index] && proQuant[index].quantity - 1}</h2>

                </div>
              </div>
            
            )): '...'} */}
        {/* <h2 className="opt-dlry-fnt">White Color</h2> */}

        <hr className="mt-1" />
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Subtotal</h6>
          <h6 className="opt-dlry-fnt">
            <i className="bi bi-currency-rupee"></i>
            {totalPrice}
          </h6>
        </div>
        <div className="ct-box justify-content-between">
          <h5 className="opt-dlry-fnt">
            <b>Discount</b>
          </h5>
          <h5 className="opt-dlry-fnt">
            <b>{disTotal}</b>
          </h5>
        </div>
        <div className="ct-box justify-content-between">
          <h6 className="opt-dlry-fnt">Delivery</h6>
          <h6 className="opt-dlry-fnt">
            <i className="bi bi-currency-rupee"></i>
            {deliveryCharges}
          </h6>
        </div>

        <div className="ct-box justify-content-between">
          <h5 className="opt-dlry-fnt">
            <b>TOTAL TO PAY</b>
          </h5>
          <h5 className="opt-dlry-fnt">
            <b>{totalPrice - disTotal + deliveryCharges}</b>
          </h5>
        </div>
        <Button
          className="ck-buy-btn"
          type="button"
          disabled={cart.length > 0 ? false : true}
          style={
            cart.length > 0 ? { cursor: "pointer" } : { cursor: "not-allowed" }
          }
          onClick={() => createNewOrder()}
        >
          BUY NOW
        </Button>

        <p className="cond-font">
          By placing your order you agree to our{" "}
          <NavLink to="/terms">Terms & Conditions</NavLink>,
          <NavLink to="/privacypolicy">privacy and returns policies</NavLink> .
          You also consent to some of your data being stored by , which may be
          used to make future shopping experiences better for you.
        </p>
      </div>
    </>
  );
};
