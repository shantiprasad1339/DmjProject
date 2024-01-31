import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "../loader/Loader";
import loginImg1 from "../../assets/images/banner/login1.png";
import dmjicon from "../../assets/images/dmj.png";

const url = "https://api.diwamjewels.com/DMJ/api/v1/user/";
const endPoint = "send/otp/signup";
const otpEndPoint = "verify/otp";

export default class Login2 extends React.Component {
  render() {
    return (
      <>
        <LoginWithMobileNo />
      </>
    );
  }
}

const LoginWithMobileNo = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [isPhone, setIsPhone] = useState("");

  const [otp, setOtpValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isOtp, setOtp] = useState(false);

  const navigate = useNavigate();

  async function authUser(txt) {
    const formdata = new FormData();   
    formdata.append("mailOrPhone", txt);
    try {
      const res = await axios.post(url + endPoint, formdata);
      console.log(res);
      if (res.data.message === "OTP send successfully") {
        setIsLoading(false);
        setOtp(true);
      }
      if (res.data.message === "Email or Phone Number Already Exist") {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);
      alert(err.response.data.message);
      navigate("/login");
    }
  }

  async function validation(txt) {
    const mobilePattern = /^[789]\d{9}$/gm;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm;

    if (mobilePattern.test(txt)) {
      localStorage.setItem("auth", "mobile");
      return true;
    } else if (emailPattern.test(txt)) {
      localStorage.setItem("auth", "email");
      return true;
    } else {
      alert("Please Enter a Correct Mobile Number / Email-Id");
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const valid = await validation(mobileNo);

    if (valid) {
      await authUser(mobileNo);
    }

    setIsLoading(false);
  };

  async function handleVerfyOtp(e) {
    setIsLoading(true);
    e.preventDefault();
    const otpValue = {
      userName: mobileNo,
      otp: otp,
    };
    try {
      const otpRes = await axios.post(url + otpEndPoint, otpValue);

      if (otpRes.data.message === "OTP verified") {
        alert("Otp Verified");
        localStorage.setItem("mailOrNo", mobileNo);
        navigate("/signUp");
      } else {
        alert("Incorrect OTP");
        setOtpValue("");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  }
  return (
    <>
      {isLoading && <Loader />}

      <div
        className="fullpage-bg pt-1"
        style={{ backgroundImage: `url(${loginImg1})` }}
      >
        <div className="container">
          <div className="login-bg shadow-sm">
            <div className="text-center cp-img-boxvw">
              <img src={dmjicon} className="coupon-img" alt="Coupon" />
            </div>
            <hr />
            <div className="user-login">
              <h6>
                <b>Login or Signup</b>
              </h6>
              <form
                style={{ position: "relative" }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {!isOtp ? (
                  <>
                    <input
                      type="text"
                      className="login-input"
                      id="login-number"
                      placeholder="Email-id"
                      value={mobileNo}
                      onChange={(e) => {
                        setMobileNo(e.target.value);
                      }}
                      required
                    />
                    <br />
                  </>
                ) : (
                  <div className="otp-container">
                    <input
                      type="text"
                      className="login-input"
                      value={mobileNo}
                      disabled
                    />
                    <b
                      style={{
                        color: "green",
                        letterSpacing: "0.3px",
                        padding: "4px",
                      }}
                    >
                      Otp Sent Successfully
                    </b>
                    <input
                      type="number"
                      className="login-input"
                      placeholder="Enter Otp"
                      value={otp}
                      onChange={(e) => {
                        setOtpValue(e.target.value);
                      }}
                      maxLength={6}
                      required
                    />
                    <br />
                  </div>
                )}

                <p className="tp-text">
                  By Continuing, I agree to the{" "}
                  <span className="tp-color">
                    <b>
                      <NavLink to="/termscondition">Terms of Use</NavLink> &{" "}
                      <NavLink to="/privacypolicy">Privacy Policy</NavLink>
                    </b>
                  </span>
                </p>
                {!isOtp ? (
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    CONTINUE
                  </button>
                ) : (
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={(e) => {
                      handleVerfyOtp(e);
                    }}
                  >
                    Verify OTP
                  </button>
                )}
                <p className="tp-text">
                  Already Have an account ?{" "}
                  <NavLink to="/login" className="tp-color">
                    <span className="text-danger">
                      <b>Log In</b>
                    </span>
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// <--------------------------------------------- UnUsed Code & Commented Code --------------------------------------------- >

/* eslint-disable no-undef */
// import { TextField } from '@mui/material';
// import { withRouter } from 'react-router-dom';
// formdata.append('type', false)
// localStorage.setItem('userAuth', mobileNo)
// console.log('firedagain')
// else {
//     alert(res.data.message)
// }
// console.log(err.response.data.message)
// console.log('mobile number:', txt);
// You can perform additional actions for a valid mobile number here.
// console.log('email address:', txt);
// You can perform additional actions for a valid email address here.
// You can handle the case of invalid input here.
// const valid = await validTxt;
// await localStorage.setItem('dmjMobileNo', mobileNo)
// navigate('/otp')
// console.log(err)
{
  /* <p className='tele-code'>+91</p> */
}
{
  /* <label className="error" style={{ display: showError }}>Enter a Correct Email-Id / Phone No.</label> */
}
{
  /* <label className="error" style={{ display: showError }}>Enter a Correct Email-Id / Phone No.</label> */
}
