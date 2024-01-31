import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { TweenMax } from "gsap";
import axios from "axios";
import FormLabel from "@mui/material/FormLabel";
import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
import loginImg1 from "../../assets/images/banner/login1.png";


const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/user/signup";

var userAuth = localStorage.getItem("mailOrNo");
var auth = localStorage.getItem("auth");

class UpdateLogin extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            password: "",
            userName: "",
            lName: "",
            email: "",
            gender: "male",
            phoneNumber: "",
            nickName: "",
            age: "",
            isPhoneEmail: false,
            isVerfy: false,
            
            isLoading: false,
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleForm = this.handleForm.bind(this);
    }
    
    componentDidMount() {
        userAuth = localStorage.getItem("mailOrNo");
        auth = localStorage.getItem("auth");
        if (userAuth) {
            this.setState({ isVerfy: true });
            if (auth === "mobile") {
                this.setState({ phoneNumber: userAuth });
            }
            if (auth === "email") {
                this.setState({ email: userAuth });
            }
        } else {
            this.setState({ isVerfy: false });
        }
        const containerRef = this.containerRef.current;
        TweenMax.fromTo(
            containerRef,
            1,
            { y: -1050, opacity: 0 },
            { y: 0, opacity: 1 }
        );
        if (!isNaN(userAuth)) {
            this.setState({ isPhoneEmail: true });
        }
    }

    handleForm = (evt) => {
        evt.preventDefault();
        this.setState({
            isLoading: true,
        });

        const {
            password,
            userName,
            lName,
            email,
            gender,
            phoneNumber,
            nickName,
            age,
        } = this.state;
        let countryCode = +91;
        let deviceToken = "79hifgh7";
        let name = userName + " " + lName;
        let fullPhoneNumber = `+${countryCode}${phoneNumber}`;
        console.log(fullPhoneNumber);
        axios
            .post(url + endPoint, {
                userName: name,
                email: email,
                password: password,
                phoneNumber: fullPhoneNumber,
                deviceToken: "79hi7",
                gender: gender,
                age: age,
                countryCode: 91,
                roles: ["user"],
            }) 
            .then((response) => {
                localStorage.removeItem("userId");
                console.log(response.data);
                localStorage.setItem("userId", response.data.data.id);
                this.setState({
                    isLoading: false,
                });
                
                if (response.data.message === "Phone Number Already Registered") {
                    alert("User Registered Please Go To Login Page");
                    window.location.href = "/";
                }
                window.location.href = "/";
            })
            .catch((error) => {
                alert(error);
                console.log(error);
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const {
            password,
            userName,
            lName,
            email,
            gender,
            phoneNumber,
            nickName,
            isPhoneEmail,
            isVerfy,
            age,
            isLoading,
        } = this.state;

        let upperCaseMatch = /(?=.*[A-Z])/gm;
        let numericMatch = /(?=.*\d)/gm;
        let specialMatch = /[~`!@#$%^&*()--+={}[\]|:;"'<>,.?_₹]/gm;

        return (
            <>
                {isLoading && <Loader />}
                <div
                    className="outer-login"
                    style={{ backgroundImage: `url(${loginImg1})` }}
                >
                    {isVerfy ? (
                        <div className="inner-login">
                            <form onSubmit={this.handleForm} style={{ height: "100%" }}>
                                <div className="inputBoxContainer" ref={this.containerRef}>
                                    <b>Complete Your Sign up</b>
                                    <br />
                                    <div className="checkBox-input">
                                        <div className="box-input">
                                            {isPhoneEmail ? (
                                                <label htmlFor="mobileNo mt-4">Mobile Number :-</label>
                                                ) : (
                                                <label htmlFor="mobileNo mt-4">Email Id :-</label>
                                            )}
                                            <p className="">{userAuth}</p>
                                        </div>
                                        <CheckIcon className="checkIcon" />
                                    </div>

                                    <TextField
                                        label="Password"
                                        variant="standard"
                                        className="inputFeild mb-1"
                                        required
                                        type="password"
                                        onChange={(e) =>
                                            this.setState({ password: e.target.value })
                                        }
                                        value={password}
                                    />

                                    <span style={{ fontSize: "12px", color: "#818181" }}>
                                        Password must contain(8 char, 1 special, 1 uppercase and 1
                                        numeric)
                                    </span>

                                    <br />
                                    <div className="nameBox mt-2">
                                        <TextField
                                            label="First Name"
                                            variant="standard"
                                            required
                                            onChange={(e) =>
                                                this.setState({ userName: e.target.value })
                                            }
                                            value={userName}
                                        />
                                        <TextField
                                            label="Last Name"
                                            variant="standard"
                                            className="lstName"
                                            onChange={(e) => this.setState({ lName: e.target.value })}
                                            required
                                            value={lName}
                                        />
                                    </div>
                                    {!isPhoneEmail ? (
                                        <TextField
                                            label="Phone "
                                            type="number"
                                            variant="standard"
                                            className="inputFeild mb-1 mt-2"
                                            value={phoneNumber}
                                            onChange={(e) =>
                                                this.setState({ phoneNumber: e.target.value })
                                            }
                                            required
                                        />
                                    ) : (
                                        <TextField
                                            label="Email "
                                            type="email"
                                            variant="standard"
                                            className="inputFeild mb-1 mt-2"
                                            value={email}
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                            required
                                        />
                                    )}

                                    <FormControl
                                        className="mt-3 radioControl"
                                        value={gender}
                                        onChange={(e) => this.setState({ gender: e.target.value })}
                                        required
                                        style={{ display: "flex", flexWrap: "wrap" }}
                                        >
                                        <FormLabel id="demo-row-radio-buttons-group-label">
                                            Select Gender
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            className="radioButtonGroup"
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio />}
                                                label="Other"
                                                />
                                        </RadioGroup>
                                    </FormControl>

                                    <TextField
                                        label="Age"
                                        type="number"
                                        variant="standard"
                                        className="inputFeild mb-1 mt-2"
                                        onChange={(e) => this.setState({ age: e.target.value })}
                                        value={age}
                                        required
                                        />


                                    <br />
                                </div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="signUpButton"
                                    color="error"
                                    >
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div
                            className="text-center ps-4"
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%,-50%)",
                            }}
                        >
                            <h2 className="mb-4">Please verify Email-Id </h2>
                            <NavLink
                                to="/login"
                                className="btn btn-primary"
                                style={{ padding: "12px 34px" }}
                            >
                                Verify Phone No. or Email-id
                            </NavLink>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default UpdateLogin;

class ErrMessageBox extends React.Component {
    render() {
        const { text, color } = this.props;
        return (
            <div className="err-box" style={{ backgroundColor: color }}>
                {text}
            </div>
        );
    }
}







// <--------------------------------------------- UnUsed Code & Commented Code --------------------------------------------- >

// import { Navigate, useNavigate } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import {withRouter} from 'react-router-dom';
// const navigator = useNavigate()
// let age = 43;
// console.log(password, userName, gender, email, phoneNumber);
// console.log(formData);
{/* <label style={{ fontSize: "0.68rem" }}>This Will help recover your account if needed</label> */}
{/* <TextField label="Nick Name" variant="standard" className="inputFeild mb-1" type='text'
onChange={(e) => this.setState({ nickName: e.target.value })}
required
/> */}