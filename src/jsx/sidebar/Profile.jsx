import React, { useEffect, useState } from "react";
import "./Sidebar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/user/";

const userId = localStorage.getItem("userId");

const Profileinfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);

  async function fetchUserData() {
    try {
      const res = await axios.get(url + endPoint + userId);
      // console.log(res.data.data)
      setUserInfo(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="sidebar-content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="shadow-sm profile-info-box">
                <h5>Profile Details</h5>
                <hr></hr>
                <div className="user-add-info">
                  <p className="profile-info-text">Full Name</p>
                  <p className="profile-info-text">{userInfo.userName}</p>
                </div>
                <div className="user-add-info">
                  <p className="profile-info-text">Mobile Number</p>
                  <p className="profile-info-text">{userInfo.phoneNumber}</p>
                </div>

                <div className="user-add-info">
                  <p className="profile-info-text">Email ID</p>
                  <p className="profile-info-text">{userInfo.email}</p>
                </div>
                <div className="user-add-info">
                  <p className="profile-info-text">Gender</p>
                  <p className="profile-info-text">{userInfo.gender}</p>
                </div>
                <div className="user-add-info">
                  <p className="profile-info-text">Age</p>
                  <p className="profile-info-text">{userInfo.age}</p>
                </div>
                {/* <div className="user-add-info">
                                    <p className="profile-info-text">Location</p>
                                    <p className="profile-info-text">Jaipur</p>
                                </div>
                                <div className="user-add-info">
                                    <p className="profile-info-text">Alternate Mobile</p>
                                    <p className="profile-info-text">not added</p>
                                </div>
                                <div className="user-add-info">
                                    <p className="profile-info-text">Hint Name</p>
                                    <p className="profile-info-text">not added</p>
                                </div> */}
                <button
                  className="pro-ed-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Go Back to Home Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profileinfo;
