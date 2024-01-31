import React, { useState } from "react";
import logo from "../../assets/images/dmj.png";
import etsy from "../../assets/images/etsy.png";
import amazon from "../../assets/images/amazon.png";
import ebay from "../../assets/images/ebay.png";
import indiamart from "../../assets/images/indiamart.png";
import flipkart from "../../assets/images/flipkart.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { addSearch } from "../redux/dmjSlice";
import { useDispatch } from "react-redux";
import shareicon from "../../assets/images/shareicon.png";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "react-bootstrap/Accordion";
import { Chat } from "@mui/icons-material";
import facebook from '../../assets/images/facebook.png'
import instagram from '../../assets/images/instagram.png'
import whatsapp from '../../assets/images/whatsapp.png'
import telegram from '../../assets/images/telegram.png'


const useFullLink = [
  {
    title: "Jewellery",
    link: false,
  },
  {
    title: "Handi crafts",
    link: false,
  },

  {
    title: "Blue Pottery",
    link: false,
  },
];

const section = [
  {
    title: "About DMJ",
    link: "/about",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: " Track Your Order",
    link: "/trackOrder",
  },

];

const info = [

  {
    title: "  Returns & Refund",
    link: "/refundpolicy",
  },
  {
    title: "Terms & Conditions",
    link: "/termscondition",
  },
  {
    title: " Privacy Policy",
    link: "/privacypolicy",
  },
  {
    title: "Shipping Policy",
    link: "/shippingpolicy",
  },
  {
    title: "Contact Us",
    link: "/contactUs",
  },
];

export default class Footer extends React.Component {
  render() {
    return (
      <>
        <ShareIcon />
        <div className="footer-desktopvw">
        <ContentOfFooter />
          </div>
      
          
          <div className="footer-mobvwsh mt-1">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>More about online shopping at DMJ</Accordion.Header>
                <Accordion.Body>
                <ContentOfFooter />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
      </>
    );
  }
}



const ContentOfFooter = () =>{
  return (
    <>
  <footer className="footer-bg mt-1">
            <div className="container-fluid">
              <div className="row">
                <div className="col mt-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="img-fluid footer-logo"
                  />

                  <p className="footer-para mt-3">
                    Elevate your style with exquisite jewelry. Discover timeless
                    pieces for every occasion on our curated jewelry website.
                  </p>

                  <h6
                    style={{ color: "#abdbe3", fontSize: "18px" }}
                    className="mt-4"
                  >
                    <b>Social Media</b>
                  </h6>
                  <ul className="list-unstyled d-flex">
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.facebook.com/diwamjewels"
                      >
                        <i className="bi bi-facebook fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.youtube.com/@diwamjewelsvlog"
                      >
                        <i className="bi bi-youtube fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.instagram.com/diwamjewels/"
                      >
                        <i className="bi bi-instagram fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://twitter.com/DiwamJewels"
                      >
                        <i className="bi bi-twitter fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.pinterest.ca/diwamjewels/"
                      >
                        <i className="bi bi-pinterest fs-5 footer-icbx"></i>
                      </NavLink>
                    </li>
                  </ul>

                  <h6
                    style={{ color: "#abdbe3", fontSize: "18px" }}
                    className="mt-4"
                  >
                    <b>E-Commerce</b>
                  </h6>
                  <ul className="list-unstyled d-flex">
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.etsy.com/in-en/shop/DiwamHandicrafts?ref=shop-header-name&listing_id=1482578792"
                      >
                        <img src={etsy} alt="icon" className="ecomrce-icon" />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink className="link-dark" to="/">
                        <img src={amazon} alt="icon" className="ecomrce-icon" />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink className="link-dark" to="/">
                        <img src={ebay} alt="icon" className="ecomrce-icon" />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink className="link-dark" to="/">
                        <img
                          src={flipkart}
                          alt="icon"
                          className="ecomrce-icon"
                        />
                      </NavLink>
                    </li>
                    <li className="ms-3">
                      <NavLink
                        className="link-dark"
                        to="https://www.indiamart.com/diwamjewels-jaipur/"
                      >
                        <img
                          src={indiamart}
                          alt="icon"
                          className="ecomrce-icon"
                        />
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <FooterItem
                  head=" Useful Links"
                  items={useFullLink}
                  navi={false}
                />
                <FooterItem head=" Main Pages" items={section} navi={true} />
                <FooterItem head=" Important" items={info} navi={true} />
              </div>
                 <div className="footer-topline"></div>
                 {/* <div>
                 <h3 className="ppl-srch-hdfnt">Popular Searches</h3>
                 <div className="pplr-srch-inblk">
                 <PopularSearches />
                 <PopularSearches />
                 <PopularSearches />
                 <PopularSearches />
                 </div>
                 </div> */}
                 
              <div className="copy-cnt-shw footer-topline">
              <p className="text-white mt-4 mb-4">In case of any concern, <NavLink to="/contactus" style={{color:'#ABDBD3'}}><b>Contact Us</b></NavLink></p>
                <p className="footer-para mt-4 mb-4">
                  {/* &copy; 2021-2024 Diwamjewels, All rights reserved. */}
                  &copy; 2021-24 DMJ - A unit of A2G TRADERS PVT. LTD. (Developed & Manage by <NavLink to='https://ahitechno.com/' style={{color:'#87CEEB'}}>AHIT</NavLink> ). All Rights Reserved
                </p>
              </div>
              <div className="footer-topline"></div>
              <div className="copy-cnt-shw mt-3 mb-3">
                <div className="">
                  <h6 className="heading-tag-h6ftr mb-4"><b>Registered Office Address</b></h6>
                  <AddressTag address="Diwamjewels,101 Ground Floor,"/>
                  <AddressTag address="Gurukripa Enclave, Near Old Ramgarh Mod Bus Stand ,"/>
                  <AddressTag address="IndusInd Bank, 302002, JAIPUR"/>
                </div>
                <div className="mt-3">
                  <p className="address-ftrfnt">CIN: U7980456790</p>
                  <p className="address-ftrfnt">Telephone: <NavLink style={{color:'#ABDBD3'}}>+91-9664073873</NavLink></p>
                </div>
              </div>

              <div className="footer-topline"></div>
              <div className="mt-3">
                 <FooterContentDetails />
              </div>
              </div>
            </footer>
          
    </>
  );
}

const FooterItem = ({ head, items, navi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleNavigate(val) {
    // await dispatch(addSearch(val));
    navigate(`/c/${val}`);
  }

  return (
    <>
      <div className="col mt-5">
        <h5 className="footer-main-heading">
          {head}
        </h5>

        <p className="headline"></p>

        <ul className="nav flex-column mt-2">
          {items.map((itemVal, index) => {
            return (
              <li className=" mb-2 ftr-list-tag-fnt" key={index}>
                {navi ? (
                  <NavLink
                    className="nav-link p-0 ftr-list-tag-fnt"
                    to={itemVal.link}
                  >
                    {itemVal.title}
                  </NavLink>
                ) : (
                  <li
                    className="nav-link p-0 ftr-list-tag-fnt"
                    onClick={() => {
                      handleNavigate(itemVal.title);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {itemVal.title}
                  </li>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const ShareIcon = () => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
    console.log(isBoxOpen);
  };

  

  return (
    <>
      <div className="share-icon-box1">
        <div className="chat-icon-boxft" onClick={toggleBox}>
          {isBoxOpen ? (
            <p className="chat-optiontab"><b>Chat</b></p>
          ) : (
            <p className="chat-optiontab"><b>Chat</b></p>
          )}
        </div>
        {isBoxOpen && (
          <div className="scl-icnftr-vw">
    
        
           <div className="sticky-icons flip-up">
              <div><NavLink
                className="link-dark"

                to="https://www.facebook.com/diwamjewels"
              >
                {/* <i className="bi bi-facebook fs-5 footer-icbx"></i> */}
                <img src={facebook} alt="icon" className="chat-icon-szbox" />
              </NavLink></div>
             
              <div className=""> 
              <NavLink className="link-dark stky-scl-icngap" to="https://api.whatsapp.com/send?phone=919664073873">
                {/* <i className="bi bi-whatsapp fs-5 footer-icbx"></i> */}
                <img src={whatsapp} alt="icon" className="chat-icon-szbox"/>
              </NavLink>
              </div>
            </div>
         
            <div className="sticky-icons1">
              <NavLink
                className="link-dark"

                to="https://www.instagram.com/diwamjewels/"
              >
                {/* <i className="bi bi-instagram fs-5 footer-icbx"></i> */}
                <img src={instagram} alt="icon" className="chat-icon-szbox" />
              </NavLink>
              
              <NavLink className="link-dark" to="/">
                {/* <i className="bi bi-telegram fs-5 footer-icbx ms-2"></i> */}
                <img src={telegram} alt="icon" className="chat-icon-szbox" />
              </NavLink>
            </div>
            
       
          </div>
        )}
      </div>
    </>
  );
};



const PopularSearches = () => {
  return (
    <>
   
      <div className="d-flex ms-1">
        <p className="pop-srch-fnt-sz">Rings</p> 
        <div className="ftr-leftline"></div>
        <p className="pop-srch-fnt-sz">Rings</p>
      </div>
    </>
  )
}

const AddressTag = (props) => {
  return (
    <>
<p className="address-ftrfnt">{props.address}</p>
    </>
  )
}

const FooterContentDetails = () => {
  return (
    <>
      <div>
        <h6 className="heading-tag-h6ftr">Shop Online at DMJ with Complete Convenience</h6>
        <p className="para-cnt-ftrfnt">Welcome to DMJ, your one-stop destination for a seamless online shopping experience. We understand that convenience matters, and we've tailored our website to ensure your shopping journey is as effortless as possible.</p>
        <h6 className="heading-tag-h6ftr">Why Choose DMJ?</h6>
        {/* <p className="para-cnt-ftrfnt">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias enim qui et libero doloremque maxime in, inventore corporis iure quisquam voluptatibus voluptate consectetur. Commodi velit architecto alias ducimus, esse totam.</p>
        <ol className="para-cnt-ftrfnt">
          <li className="mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet blanditiis officia tempora ad impedit dignissimos accusamus harum iure magni id.</li>
          <li className="mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas expedita accusamus dolores unde iure, architecto voluptate cum magnam autem sed.</li>
        </ol>
        <p className="para-cnt-ftrfnt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nam beatae excepturi eaque qui laborum accusamus maxime atque repellendus sint.</p> */}
        <ul className="">
          <li className="mt-2 para-cnt-ftrfnt">
          <b>Extensive Collection:</b> We sell a wide range of products, from jewelry and handicrafts to blue pottery. We curate the finest selection to cater to your unique tastes and preferences.
          </li>
          <li className="mt-2 para-cnt-ftrfnt"><b>User-Friendly Interface:</b> Our website was created with you in mind.Navigate easily, find products quickly, and enjoy a smooth browsing experience.</li>
         <li className="mt-2 para-cnt-ftrfnt"><b>Secure Transactions:</b> Rest assured, your security is our priority. To protect your personal information and payment information, we employ the most recent encryption technology.</li>
         <li className="mt-2 para-cnt-ftrfnt"><b>Flexible Payment Options:</b> Choose from various payment methods that suit you best. Shopping at DMJ is not just easy; it's also flexible.</li>
         <li className="mt-2 para-cnt-ftrfnt"><b>Prompt Delivery:</b> We value your time. Expect timely and reliable delivery services right to your doorstep.</li>
         <li className="mt-2 para-cnt-ftrfnt"><b>Dedicated Customer Support:</b> Have questions or need assistance? Our helpful customer service staff is available to assist you.. We're just a message away.</li>
        </ul>

        <h6 className="heading-tag-h6ftr">Your Convenience Matters</h6>
        <p className="para-cnt-ftrfnt">At DMJ, we believe that shopping should be a joy, not a hassle. We've taken every step to make sure you have a convenient, enjoyable experience every time you purchase from our website.
Join our community of satisfied customers who trust DMJ for quality products, excellent service, and complete shopping convenience. Shop online at DMJ today and discover a world of elegance at your fingertips.
</p>
      </div>
    </>
  )
}