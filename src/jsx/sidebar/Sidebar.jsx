import React from "react";
import "./dashboard.css";
import Overviewpage from "./Overview";
import Orderpage from "./Order";
import Profileinfo from "./Profile";
import SavedCardPage from "./Savedcard";
import Saveaddress from "./Address";
import Couponpage from "./Coupon";
import UPI from "./Vpasaved";
import Policy from "./Terms";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddCardIcon from "@mui/icons-material/AddCard";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export default class Dashboard extends React.Component {
  render() {
    return (
      <>
        <HeaderCon />
        <Navbar />
        <Sidenavbar />
      </>
    );
  }
}
class Sidenavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // overview: "",
      order: "",
      profile: "",
      saveaddress:"",
      // savedcard: "",
      // address: "",
      // coupon: "",
      // terms: "",
      // vpacard: "",
      // editprofile: "",
      displayElement: "order",
    };
  }
  setDisplay(val) {
    this.setState({ displayElement: val });
  }
  render() {
    const { displayElement } = this.state;
    return (
      <>
        <div className="desktop-vw-box">
          <div className="d-flex flex-column flex-shrink-0 p-3 sidenav">
            <ul className="nav nav-pills flex-column mb-auto">
              {/* <li className="nav-item">
                            <h6 className="side-tab" onClick={() => this.setDisplay('overview')} aria-current="page">
                                <DashboardCustomizeIcon className="fs-5"></DashboardCustomizeIcon> OVERVIEW
                            </h6>
                        </li>
                        <hr></hr> */}
 <h6 className="side-tab" aria-current="page" onClick={() => this.setDisplay('order')}>
                  <LocalShippingIcon className="fs-5"></LocalShippingIcon> ORDERS
                </h6>

            
              <hr></hr>
              <li className="nav-item">
              <h6
                className="side-tab"
                onClick={() => this.setDisplay("Profile")}
              >
                <ManageAccountsIcon className="fs-5"></ManageAccountsIcon>{" "}
                Profile
              </h6>
              </li>
            
              <hr></hr>
              <li className="nav-item">
              <h6
                className="side-tab"
                onClick={() => this.setDisplay("saveaddress")}
              >
                <EmojiPeopleIcon className="fs-5"></EmojiPeopleIcon>{" "}
                Address
              </h6>
              </li>

              {/* <li className="nav-item">
                <p className='account-fnt-sz1'> ACCOUNT</p>

                <h6 className="side-tab" onClick={() => this.setDisplay('savedcard')}>Saved Cards</h6>
                            <h6 className="side-tab" onClick={() => this.setDisplay('Vpasaved')}>Saved VPA</h6>
                            <h6 className="side-tab" onClick={() => this.setDisplay('Address')}>Addresses</h6>
              </li> */}


              {/* <li className="nav-item">
                        <p className='account-fnt-sz1'><AddCardIcon className="fs-5"></AddCardIcon> CREDITS</p>
                            <h6 className="side-tab" onClick={() => this.setDisplay('coupon')}>My Coupons</h6>
                            <h6 className="side-tab"> DMJ Credit</h6>
                            <h6 className="side-tab">DMJ Cash</h6>
                           
                        
                        </li> */}
              {/* <hr></hr>
                        <li className="nav-item">
                            <h6 className="side-tab" aria-current="page" onClick={() => this.setDisplay('Terms')}>
                             <PhonelinkLockIcon className="fs-5"></PhonelinkLockIcon> TERMS & PRIVACY POLICY
                            </h6>
                        </li> */}
            </ul>
          </div>
        </div>
        <div className="mobile-view-tabs">
        <div className="container-fluid">
        <div className="row-gridvw">
            <div className="column-size">
            <div className="list-box-view">
            <h6
                  className="side-tab"
                  aria-current="page"
                  onClick={() => this.setDisplay("Profile")}
                >
                  <ManageAccountsIcon className="fs-5"></ManageAccountsIcon>{" "}
                  Profile
                </h6>
                </div>
            <div className="list-box-view">
            <h6
                  className="side-tab"
                  aria-current="page"
                  onClick={() => this.setDisplay("saveaddress")}
                >
                  <EmojiPeopleIcon className="fs-5"></EmojiPeopleIcon>{" "}
                  Address
                </h6>
                </div>
            </div>

            <div className="column-size">
            <div className="list-box-view">
            <h6 className="side-tab" aria-current="page" onClick={() => this.setDisplay('order')}>
                  <LocalShippingIcon className="fs-5"></LocalShippingIcon> ORDERS
                </h6>
                </div>
            </div>

           </div>
        </div>
        </div>

        {displayElement === "order" ? <   Orderpage/> :
        (displayElement === 'saveaddress') ? <Saveaddress /> :
          displayElement === "Profile" ? <Profileinfo /> : null
        }

                        {/* (displayElement === 'order') ? <Orderpage /> :
                        (displayElement === 'coupon') ? <Couponpage /> :
                        (displayElement === 'Address') ? <Saveaddress /> :
                        (displayElement === 'Vpasaved') ? <UPI /> :
                        (displayElement === 'Terms') ? <Policy /> : */}
        {/* <SavedCardPage />  */}
      </>
    );
  }
}
