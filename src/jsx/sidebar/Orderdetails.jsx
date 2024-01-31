import React from 'react';
import deliveryimg from './box.png'
import productimg from './product.png';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import './dashboard.css';


export default class Details extends React.Component {
    render() {
        
       
        return (
            <>
<div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-5">
                            <div className="ord-del-box">
                                
                                <Orderdetails productId={productId}/>

                                <Listitem />
                                <Deliveryaddress />
                                <Pricedetail />
                                <Otheritem />
                                <Updates />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Orderdetails extends React.Component {
    render(props) {
      
        return (
            <>

                <p className="text-end"><b>Help</b></p>
                <div className="text-center"><img src={productimg} alt="Product" className="img-fluid pro-image" />
                    <h6 className="mt-3">Shoes</h6>
                    <p className="od-del-text">Airdopes 451v2 M True Wireless Earbuds with 25H Playback and ENx Tech-Active Black</p>
                    <p className="od-del-text">Size: Onesize</p>
                </div>

                <div className="dis-delivery-del">
                    <img src={deliveryimg} alt="Product" className="del-img mt-1" />
                    <div className="ms-3 mt-1">
                        <h6>Delivered</h6>
                        <p className="delivery-date">On Sunday, 27 Feb 2023</p>
                    </div>
                </div>
            </>
        )
    }
}

class Listitem extends React.Component {
    render() {
        return (
            <>
                <div className="ex-list mt-3">
                    <ul>
                        <li className="item-list-text ul-li-text">Exchange/Return window closed on Wed, 9 Mar 2022</li>
                    </ul>
                </div>
            </>
        )
    }
}

class Deliveryaddress extends React.Component {
    render() {
        return (
            <>
                <div className="ex-list">
                    <div className="item-list-text"><h6 className="add-font">Delivery Address</h6>
                        <p className="user-info mt-3"><b>Ankit Samant | 8005779031</b></p>
                        <p className="ul-li-text">31 Arjun Colony, Fakiro Ki Doongri, Govind Nagar East, Behind Brahampuri, Amer Road, Jaipur - 302002</p>
                    </div>

                </div>
            </>
        )
    }
}

class Pricedetail extends React.Component {
    render() {
        return (
            <>
                <div className="ex-list">
                    <div className="item-list-text">
                        <div className="user-add-info">
                            <p className="user-info"><b>Total Item Price</b></p>
                            <p className="user-info"><b>₹ 2699.00</b></p>
                        </div>
                        <div className="user-add-info save-text">
                            <p className="ul-li-text">You saved <span className="text-success"><b>₹ 3291.00 </b></span>on this item</p>
                            <p className="text-danger ul-li-text"><b>View Breakup</b></p>
                        </div>
                        <button className='invoice-btn'>GET INVOICE</button>
                    </div>
                </div>
            </>
        )
    }
}

class Otheritem extends React.Component {
    render() {
        return (
            <>
                <div className="ex-list">
                    <div className="item-list-text">
                        <h6 className="add-font">Other items in this order</h6>
                        <p className="ul-li-text">Order ID # 1197741 92932873931203</p>

                        <div className="order-display info-del-pro ">
                            <img src={productimg} alt="Delivery" className="img-fluid product-image" />
                            <div className="ms-3 mt-2">
                                <h5>Shoes</h5>
                                <p className="pro-info-text">U S Polo Assn Men Grey BRENTT 2.0 Sneakers</p>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="user-add-info">
                            <p className="user-info"><b>Total Order Price</b></p>
                            <p className="user-info"><b>₹ 11980.00</b></p>
                        </div>
                        <p className="text-danger ul-li-text text-end save-text"><b>View Breakup</b></p>
                    </div>
                </div>
            </>
        )
    }
}


class Updates extends React.Component {
    render() {
        return (
            <>
                <div className="ex-list">
                    <div className="item-list-text">
                        <h6 className="add-font">Updates sent to</h6>
                        <p className='ul-li-text mt-3'>
                            <LocalPhoneIcon className="fs-5"></LocalPhoneIcon><span className='ms-3'>8005779031
                            </span>
                        </p>
                        <p className="ul-li-text"><EmailIcon className="fs-5"></EmailIcon><span className='ms-3'>ankit.samant.ank@gmail.com</span></p>
                    </div>
                </div>
            </>
        )
    }
}