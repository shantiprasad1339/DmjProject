import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import Marquee from "react-fast-marquee";
import CheckOrder from "./CheckOrder";
import { NavLink } from 'react-router-dom';

export default class HeaderCon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isShow: false ,
    }

    this.handleModel = this.handleModel.bind(this)

  }


  async handleModel() {
    const isShow = await this.state.isShow;

    this.setState({ isShow:false })
  }


  render() {
    const { isShow } = this.state;
    return (
      <>
        <div className="header-deskvw">
          <div className="header-bg">
            <div className="header-cont-box">
              <div className="header-icon header-box-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="bi bi-geo-alt"></i>
                <p onClick={()=>{
                  this.setState({isShow:!isShow})
                }}>
                  Select your address
                </p>
              </div>
              <div>
                <Marquee>
                 <p>Up to 50% off Deal of the day</p> 
                </Marquee>
              </div>
              <div className="header-icon">
                <NavLink className="text-decoration-none" to="tel:+91-9664073873"><p className="header-text text-white">
                  <i className="bi bi-telephone-fill"></i> +91-9664073873
                </p></NavLink>
               <NavLink to="mailto:diwamjewels@gmail.com" className="text-decoration-none"><p className="ms-3 header-text text-white">
                  <i className="bi bi-envelope-fill"></i> diwamjewels@gmail.com

                </p></NavLink> 
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------------Mobile View---------------------------- */}
        <div className="header-cont-mbvw">
          <div className="header-bg">
              <Marquee style={{overflowX:'hidden !important'}}>
                Up to 50% off Deal of the day
              </Marquee>
            <div className="header-cont-box mt-1">
              <div className="header-icon header-box-1 header-text" data-bs-toggle="modal" data-bs-target="#exampleModal">

                {/* <p className="header-text">
                  <i className="bi bi-geo-alt"></i> Location
                </p> */}

                <div className="header-icon header-box-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <i className="bi bi-geo-alt"></i>
                <p className="header-text" onClick={()=>{
                  this.setState({isShow:!isShow})
                }}>
                  Select your address
                </p>
              </div>
              </div>

              <div className="header-icon">
              <NavLink className="text-decoration-none" to="tel:+91-9664073873"><p className="header-text text-white">
                  <i className="bi bi-telephone-fill"></i> 9664073873
                </p></NavLink>
                <NavLink to="mailto:diwamjewels@gmail.com" className="text-decoration-none"><p className="ms-3 header-text text-white">
                  <i className="bi bi-envelope-fill"></i> diwamjewels@gmail.com
                </p></NavLink> 
              </div>
            </div>
          </div>
        </div>

        {
          isShow && <CheckOrder 
            isShow={isShow}
            handleModel={this.handleModel}
          />
        }


      </>
    );
  }
}