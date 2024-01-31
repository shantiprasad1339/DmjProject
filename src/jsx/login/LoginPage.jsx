/* eslint-disable no-undef */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg1 from "../../assets/images/banner/login1.png";
import Loader from "../loader/Loader";
import dmjicon from "../../assets/images/dmj.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { initializeApp } from "firebase/app";
import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const url = "https://api.diwamjewels.com/DMJ/api/v1/user/";
const verifyEndPoint = "verify/otp";
const endPoint = "send/otp/signin";
const signIn = "signin/withEmailOrPhoneNumber";
const dataBaseUrl = 'signin/emailOrPhoneNumbe'
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
  const [confirmationResultOtp, setConfirmationResult] = useState(null);
  const [isOtp, setOtp] = useState(false);
  const [otp, setOtpValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    await localStorage.setItem("mobileNo", mobileNo);
    setOtp(true);
  };

  async function verifyOtp(e) {
    setLoading(true);
    e.preventDefault();
    const otpValue = {
      userName: mobileNo,
      otp:otp
    };

    try {
      const otpRes = await axios.post(url + verifyEndPoint, otpValue);
      
      if(otpRes.data.message === "OTP verified"){
        handleSubmit()
        navigate('/')
        window.location.reload()
      }else(
        alert('Invalid OTP! Please retry again.')
      )

     
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  async function sentOtp() {
    setLoading(true);
    // e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const formdata = new FormData();

    formdata.append("email", mobileNo);
   

    try {
      const otpRes = await axios.post(url + endPoint, formdata, { headers });

      // console.log(otpRes)
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
  
  const auth = getAuth(initializeApp(firebaseConfig));
  // let confirmationResult = null;
  function CheckUser (){
    // console.log("DataNumber",mobileNo);
    const formdata = new FormData();
    formdata.append('emailOrPhone' , mobileNo);
    axios.post(url+dataBaseUrl,formdata).then((res)=>{
      localStorage.setItem("userId", res.data.data.id);
      sentOtp()
      // console.log(res.data.data.id);
      
    }).catch((err)=>{ 
    localStorage.removeItem("userId"); 
    alert("You have'nt regestered yet, please signup first!")
    console.log(err);
  })
}

  const handleSendCode = async () => {
    const recaptcha = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "normal",
        callback: (response) => {
          console.log("reCAPTCHA solved:");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired");
        },
      },
      auth
    );

    try {
      let confirmationResult = await signInWithPhoneNumber(
        auth,
        mobileNo,
        recaptcha
      );
      setConfirmationResult(confirmationResult);
      setOtp(true);
      console.log("Confirmation result:", confirmationResult);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleVerifyCode = async () => {
    try {
      if (confirmationResultOtp) {
        const user = await confirmationResultOtp.confirm(otp);
        // console.log("User:", user);
        navigate("/");
        window.location.reload();
      } else {
        console.error("Confirmation result is null.");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Otp");
    }
  };
 
  function checkPhoneNoAvailable() {

    const cleanMobileNo = mobileNo.replace(/\s/g, '');
    const formData = new FormData();
    formData.append('emailOrPhone', cleanMobileNo);
  
    axios.post(url + dataBaseUrl, formData)
      .then((res) => {
        localStorage.setItem("userId", res.data.data.id);

        // console.log(res);
        handleSendCode()
      })
      .catch((err) => {
   
        alert("You haven't registered yet, please sign up first!");
        console.log(err);
      });
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
              <div id="recaptcha"></div>
              <div className="user-login">
                <h6>
                  <b>Login</b>
                </h6>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  
                  {mobileNo && (mobileNo[0] === "+" || !isNaN(mobileNo[0])) ? (
                 <PhoneInput
                 country={"in"}
                 value={mobileNo}
                 inputProps={{
                   required: true,
                   autoFocus: true,
                 }}
                 onChange={(value) => {
                   // Check if the value is not empty
                   if (value && !value.startsWith("+")) {
                     // If the value is not empty and doesn't start with +, add the + sign
                     value = "+" + value;
                   }
               
                   // Update the state with the modified value
                   setMobileNo(value);
                 }}
               />
               
                 
                  ) : (
                    <input
                      type="text"
                      className="login-input"
                      id="login-number"
                      placeholder="Mobile No./Email-id "
                      value={mobileNo}
                      onChange={(e) => {
                        setMobileNo(e.target.value);
                      }}
                      required
                    />
                  )}

                  <div className="pas-eicon-box">
                    {/* <input
                      type= {showPassword ? 'text' : 'password'} 
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
                    /> */}
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
                      {/* <button className="btn btn-primary mt-2" onClick={handleVerifyCode}>otp verify</button> */}
                    </>
                  )}
                  <br />
                  {/* <NavLink to="/forgetpassword">
                    <p className="for-pass-fnt">
                      <b>Forget Password ?</b>
                    </p>
                  </NavLink> */}
                  <p className="tp-text">
                    By Continuing, I agree to the{" "}
                    <span className="tp-color">
                      <b>
                        <NavLink to="/termscondition">Terms of Use</NavLink> &{" "}
                        <NavLink to="/privacypolicy">Privacy Policy</NavLink>
                      </b>
                    </span>
                  </p>
                  {isOtp ? (
                    <button
                      type="button"
                      className="continue-btn"
                      onClick={(e) => {
                        if (
                          mobileNo &&
                          (mobileNo[0] === "+" || !isNaN(mobileNo[0]))
                        ) {
                          handleVerifyCode(e);
                        } else {
                          verifyOtp(e);
                        }
                      }}
                    >
                      Verify and Log In
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="continue-btn"
                      onClick={(e) => {
                        if (
                          mobileNo &&
                          (mobileNo[0] === "+" || !isNaN(mobileNo[0]))
                        ) {
                          checkPhoneNoAvailable(e);
                        } else {
                          CheckUser(e);
                        }
                      }}
                    >
                      Request OTP
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
