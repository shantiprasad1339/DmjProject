import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg1 from "../../assets/images/banner/login1.png";
import Loader from "../loader/Loader";
import dmjicon from "../../assets/images/dmj.png";
import VisibilityIcon from "@mui/icons-material/Visibility";


const url = "https://api.diwamjewels.com/DMJ/api/v1/user/";
const verifyEndPoint = "verify/otp";
const endPoint = "send/otp/login";
const signIn = "signin/withEmailOrPhoneNumber";


export default class LoginPage extends React.Component {
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
  const [password, setPassword] = useState("");
  const [isPhone, setIsPhone] = useState("");
  
  const [isOtp, setOtp] = useState(false);
  const [otp, setOtpValue] = useState("");
  
  const [isLoading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await localStorage.setItem("mobileNo", mobileNo);
    setOtp(true);
  };

  async function verifyOtp(e) {
    setLoading(true);
    e.preventDefault();
    const otpValue = {
      userName: mobileNo,
      otp: otp,
    };
    
    try {
      const otpRes = await axios.post(url + verifyEndPoint, otpValue);
      
      if (otpRes.data.message === "OTP verified") {
        let formdata = new FormData();
        
        formdata.append("userName", mobileNo);
        formdata.append("password", password);
        
        try {
          const loginRes = await axios.post(url + signIn, formdata);
          localStorage.setItem("userId", loginRes.data.data.id);
          if (loginRes.data.data.id) {
            navigate("/");
            window.location.reload();
          }
        } catch (err) {
          console.log(err);
          alert("Please Enter a Correct OTP");
        }
      } else {
        console.log("Otp Expired");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }
  
  async function sentOtp(e) {
    setLoading(true);
    e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    
    const formdata = new FormData();
    
    formdata.append("mailOrPhone", mobileNo);
    formdata.append("password", password);
    
    try {
      const otpRes = await axios.post(url + endPoint, formdata, { headers });

      if (otpRes.data.message === "OTP send successfully") {
        setOtp(true);
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.message == "Bad credentials") {
        alert("Invalid Email Or Password");
      }
    }
    setLoading(false);
  }
  
  return (
    <>
      {!isLoading ? (
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
                  <b>Login</b>
                </h6>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
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

                  <div className="pas-eicon-box">
                    <input
                      type={showPassword ? 'text' : 'password'} 
                      className="login-input"
                      
                      placeholder="Enter the Password*"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                    <VisibilityIcon
                      className="password-icon"
                      onClick={togglePasswordVisibility}
                      />
                  </div>

                  {isOtp && (
                    <>
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
                        placeholder="Enter the Otp*"
                        value={otp}
                        onChange={(e) => {
                          setOtpValue(e.target.value);
                        }}
                        required
                      />
                    </>
                  )}
                  <br />
                  <NavLink to="/forgetpassword"><p className="for-pass-fnt">
                    <b>Forget Password ?</b>
                  </p></NavLink>
                  <p className="tp-text">By Continuing, I agree to the <span className="tp-color"><b><NavLink to='/termscondition'>Terms of Use</NavLink> & <NavLink to='/privacypolicy'>Privacy Policy</NavLink></b></span></p>
                  {isOtp ? (
                    <button
                    type="button"
                      className="continue-btn"
                      onClick={(e) => {
                        verifyOtp(e);
                      }}
                    >
                      Verify and Log In
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="continue-btn"
                      onClick={(e) => {
                        sentOtp(e);
                      }}
                    >
                      SIGN IN
                    </button>
                  )}
                  <p className="tp-text mb-2">
                    New to DMJ ?{" "}
                    <NavLink to="/defaultLogin" className="tp-color">
                      <span className="text-danger">
                        <b>Sign Up</b>
                      </span>
                    </NavLink>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};













// <--------------------------------------------- UnUsed Code & Commented Code --------------------------------------------- >

/* eslint-disable no-undef */
// import { TextField } from '@mui/material';
// import { withRouter } from 'react-router-dom';
// console.log('fired')
// console.log(loginRes.data.data)
// console.log(otpRes)/
{/* <label className="error" style={{ display: showError }}>Enter a Correct Email-Id / Phone No.</label> */}