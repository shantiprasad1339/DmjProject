import React from 'react';
// import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import './dashboard.css';


export default class Editinfo extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Editprofile />
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Editprofile extends React.Component {
    render() {
        return (
            <>
                <div className='shadow-sm edit-fm-box'>
                    <h5>Edit Details</h5>
                    <hr></hr>
                    <div className="number-box">
                        <div className="user-add-info">
                            <div>
                                <span className="num-font">Mobile Number*</span>
                                <p className="phone-no-font">8005779031 <VerifiedIcon className="verify-icon"></VerifiedIcon></p>
                            </div>
                            <Button variant="outlined" className="change-btn">Change</Button>
                        </div>
                    </div>
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

                    <h6 className="mt-3 mb-3">Alternate mobile details</h6>
                    <FormControl fullWidth sx={{ m: 0 }} variant="standard" className="mb-2">
                        <InputLabel htmlFor="standard-adornment-amount">Mobile Number</InputLabel>
                        <Input
                            id="standard-adornment-amount"
                            startAdornment={<InputAdornment position="start">+91</InputAdornment>}
                        />
                    </FormControl>
                    <TextField fullWidth disabled label="Hint Name" id="hintname" margin="dense" className="textfieldInput" />
                    <Button variant="contained" className="edit-del-btn">Saved Details</Button>
                    <Button variant="outlined" className="edit-del-btn">Change Password</Button>
                </div>
            </>
        )
    }
}




