import React, { useEffect, useState } from "react";
import "./Sidebar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/user/";

const userId = localStorage.getItem("userId");

const Profileinfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <div className="text-end mt-2 mb-3">
              
               <button className="add-new" onClick={handleShow}>Edit Profile</button>
        
            </div>
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

      {/* --------------------------Modal--------------------------------- */}
      <Modal show={show} onHide={handleClose} animation={false} style={{zIndex:'100000'}}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
          
          <TextField fullWidth
                        id="fullname"
                        label="Full Name"
                        defaultValue="Ankit Samant" margin="normal" />

                    <TextField fullWidth
                        id="email"
                        label="Email"
                        defaultValue="ankit.samant.ank@gmail.com" margin="normal" />

                        
                    <TextField fullWidth
                        id="birthday"
                        label="Birthday (dd/mm/yyyy)"
                        defaultValue="16/06/1999" margin="normal" />

                    <TextField fullWidth
                        id="location"
                        label="Location"
                        defaultValue="Jaipur" margin="normal" />

                    <TextField fullWidth
                        id="fullname"
                        label="Mobile"
                        defaultValue="8005779031" margin="normal" />


                    <h6 className="mt-3 mb-3">Alternate mobile details</h6>
                    <FormControl fullWidth sx={{ m: 0 }} variant="standard" className="mb-2">
                        <InputLabel htmlFor="standard-adornment-amount">Mobile Number</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                        />
                    </FormControl>
                   
                    <button className='text-white bg-dark px-5 py-2 rounded w-100 shadow-sm border-0 mt-4'>Save details</button>
          </form>
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default Profileinfo;
