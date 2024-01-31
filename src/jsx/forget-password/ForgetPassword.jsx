import React, { useState } from "react";
import "./forgetpassword.css";
import loginImg1 from "../../assets/images/banner/login1.png";
import dmjicon from "../../assets/images/dmj.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "https://api.diwamjewels.com/DMJ/api/v1/user/";
const verifyEndPoint = "verify/otp";
const endPoint = "send/otp/login";
const signIn = "signin/withEmailOrPhoneNumber";
const emailForget = 'forgot/password/sendOtp';
const forgetPass = 'forgot/password'


const ForgetPassword = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isOtp, setOtp] = useState('otp');
  const [otp, setOtpValue] = useState("");
  const [isLoading, setLoading] = useState(false);


  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  async function handleForget(e) {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPass) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const formdata = new FormData();

    formdata.append("userName", mobileNo)
    formdata.append('password', password)

    try {
      const forgetRes = await axios.post(url + forgetPass, formdata, { headers })
      if (forgetRes.data.message === 'Password Reset Successfully') {
        alert("Password Updated successfully")
        navigate('/login')
      }

    }
    catch (err) {
      console.log(err)

    }
  }


  async function verifyOtp(e) {
    setLoading(true);
    e.preventDefault();
    const otpValue = {
      'userName': mobileNo,
      'otp': otp,
    };

    try {
      const otpRes = await axios.post(url + verifyEndPoint, otpValue);

      if (otpRes.data.message === "OTP verified") {
        // console.log('fired')
        setOtp('forget')


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

    formdata.append("userName", mobileNo);

    try {
      const otpRes = await axios.post(url + emailForget, formdata, { headers });

      if (otpRes.data.message === "OTP send successfully") {
        setOtp('verify');
      } else {
        console.log(otpRes.data.message);
        alert("Failed to send OTP: " + otpRes.data.message);
      }
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "Bad credentials"
      ) {
        alert("Invalid Email");
      } else {
        alert("Failed to send OTP. Please try again later.");
      }
    }
    setLoading(false);
  }

  return (
    <>
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
                <b>Update password</b>
              </h6>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  type="email"
                  className="login-input"
                  id="login-number"
                  placeholder="Mobile Number / Email-id *"
                  value={mobileNo}
                  onChange={(e) => {
                    setMobileNo(e.target.value);
                  }}
                  disabled={isOtp === 'otp' ? false : true}
                  required={isOtp === 'otp' ? true : false}
                />

                {isOtp === 'verify' && (
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
                {isOtp === 'forget' && (
                  <>

                    <div className="pas-eicon-box">
                      <input
                        type="password"
                        className="login-input"
                        id="login-number1"
                        placeholder="Enter the Password*"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                    </div>

                    <div className="pas-eicon-box">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="login-input"
                        id="login-number1"
                        placeholder="Confirm Password*"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                      />
                      <VisibilityIcon
                        className="password-icon"
                        onClick={togglePasswordVisibility}
                      />
                    </div>
                  </>)
                }



                <p className="tp-text">By Continuing, I agree to the <span className="tp-color"><b><NavLink to='/termscondition'>Terms of Use</NavLink> & <NavLink to='/privacypolicy'>Privacy Policy</NavLink></b></span></p>
                {isOtp === 'verify' ? (
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={(e) => {
                      verifyOtp(e);
                    }}
                  >
                    Verify Otp
                  </button>
                ) : isOtp === 'otp' ? (
                  <button
                    type="button"
                    className="continue-btn"
                    onClick={(e) => {
                      sentOtp(e);
                    }}
                  >
                    Send  Otp
                  </button>
                )
                  : isOtp === 'forget' ? (
                    <button
                      type="button"
                      className="continue-btn"
                      onClick={(e) => {
                        handleForget(e)
                      }}
                    >
                      Forget Password
                    </button>
                  ) : <></>
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
