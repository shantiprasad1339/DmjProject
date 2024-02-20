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
  const [userInfo, setUserInfo] = useState({
    Name:'',
    MobileNo:'',
    dOB:'',
    Email:'',
    gender:''
    
    
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchUserData() {
    try {
      const res = await axios.get(url + endPoint+userId );
      console.log("res=======>>>>",res.data.data.email)
      setUserInfo({
        ...userInfo,
        Name:res.data.data.userName,
        MobileNo:res.data.data.phoneNumber,
        dOB:res.data.data.age,
     Email:res.data.data.email,
     gender:res.data.data.gender
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);

  function saveUserInfo(e) {
    e.preventDefault();
    let mobileNo = userInfo.MobileNo;
  
    if (!mobileNo.startsWith("+91")) {
        
        mobileNo = "+91" + mobileNo;
    }
console.log("mobileNo=====>>>>");
    axios.put(url + endPointt + userId, {
        "userName": userInfo.Name,
        "email": userInfo.Email,
        "phoneNumber": mobileNo,
        "gender": userInfo.gender,
        "age": userInfo.dOB
    }).then((res) => {
        console.log("response ======>>>>>", res);
        window.location.reload();
    });
}

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
                  <p className="profile-info-text">{userInfo.Name}</p>
                </div>
                <div className="user-add-info">
                  <p className="profile-info-text">Mobile Number</p>
                  <p className="profile-info-text">{userInfo.MobileNo}</p>
                </div>

                <div className="user-add-info">
                  <p className="profile-info-text">Email ID</p>
                  <p className="profile-info-text">{userInfo.Email}</p>
                </div>
                <div className="user-add-info">
                  <p className="profile-info-text">Gender</p>
                  <p className="profile-info-text">{userInfo.gender}</p>
                </div>
                <div className="user-add-info">
                  <p className="profile-info-text">Age</p>
                  <p className="profile-info-text">{userInfo.dOB}</p>
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
                        value={userInfo.Name}
                        margin="normal" 
                        onChange={(e) => setUserInfo(prevState => ({ ...prevState, Name: e.target.value }))}
                        />

                    <TextField fullWidth
                        id="email"
                        label="Email"
                        value={userInfo.Email}
                        margin="normal" 
                        onChange={(e) => setUserInfo(prevState => ({ ...prevState, Email: e.target.value }))}

                        />

                        
                    <TextField fullWidth
                        id="birthday"
                        label="Age"
                        value={userInfo.dOB}
                        margin="normal" 
                        onChange={(e) => setUserInfo(prevState => ({ ...prevState, dOB: e.target.value }))}

                        />

                    <TextField fullWidth
                        id="Gender"
                        label="Gender"
                        value={userInfo.gender}
                         margin="normal" />


                    <TextField fullWidth
                        id="fullname"
                        label="Mobile"
                        value={userInfo.MobileNo}
                        margin="normal"
                        onChange={(e) => setUserInfo(prevState => ({ ...prevState, MobileNo: e.target.value }))}

                        />


                    {/* <h6 className="mt-3 mb-3">Alternate mobile details</h6>
                    <FormControl fullWidth sx={{ m: 0 }} variant="standard" className="mb-2">
                        <InputLabel htmlFor="standard-adornment-amount">Mobile Number</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                        />
                    </FormControl> */}
                   
                    <button className='text-white bg-dark px-5 py-2 rounded w-100 shadow-sm border-0 mt-4 ' onClick={saveUserInfo}>Save details</button>
          </form>
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default Profileinfo;
