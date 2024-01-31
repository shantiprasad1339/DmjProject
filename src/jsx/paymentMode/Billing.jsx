import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import img from '../../assets/images/discount.png';
import CashMode from '../paymentMode/CashMode';
import { NavLink } from 'react-router-dom';
import UpiMode from '../paymentMode/UpiMode';
import PaytmMode from '../paymentMode/PaytmMode';


export default class Billing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // paymentMode: [

            //     { 'recommended': "none", },
            //     { 'cash': "none", },
            //     { 'credit': "none", },
            //     { 'upi': "none", },
            //     { 'paytm': "none", },
            //     { 'cash': "none", },
            //     { 'banking': "none", },
            //     { 'emi': "none", }
            // ],

            displayPaymentMode: 'none',

        }

        this.updatePaymentMode = this.updatePaymentMode.bind(this);
    }


    updatePaymentMode = (value) => {
        this.setState({ displayPaymentMode: value });
    }

    render() {

        const { displayPaymentMode } = this.state;
        return (
            <>
                <HeaderCon />
                <Navbar />
                {/* main content is here // */}
                <div className="container mt-5">
                    <div className="payment-bg">
                        <h4 className="text-center text-primary"><b>PAYMENT</b></h4>
                    </div>

                    <div className="row row-dirt">
                        <div className="col-md-9 mt-5">
                            <div className="offer-box">
                                <p className="offer-text"><img src={img} alt="Discount" className="img-fluid dis-offer" /> Bank Offer</p>

                                <ul>
                                    <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                    <div className="showmoretext">
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                        <li className="list-off">15% Instant Discount on OneCard Credit Cards on a min spend of Rs 2,000. TCA</li>
                                    </div>
                                    <NavLink className="showmore-button text-decoration-none" href='#'>Show more <i className="bi bi-arrow-right"></i></NavLink>
                                </ul>
                            </div>

                            <h6 className="mt-4"><b>Choose Payment Mode</b></h6>
                            <div className="offer-box mt-4">
                                <div className="row">
                                    <div className="col-md-6 mt-3">
                                        <div className="tab tab-bg">
                                            <h6 className="tablinks active" onClick={() => {
                                                this.updatePaymentMode('recommended')
                                            }} id="defaultOpen"><i className="bi bi-star"></i> Recommended</h6>
                                            <hr />
                                            <h6 className="tablinks"
                                                onClick={() => {
                                                    this.updatePaymentMode('cash')
                                                }}
                                            ><i className="bi bi-cash-coin"></i> Cash On Delivery (Cash/UPI)</h6>
                                            <hr />
                                            <h6 className="tablinks"
                                                onClick={() => {
                                                    this.updatePaymentMode('credit')
                                                }}
                                            ><i className="bi bi-credit-card"></i> Credit/Debit Card</h6>
                                            <hr />
                                            <h6 className="tablinks"
                                                onClick={() => {
                                                    this.updatePaymentMode('upi')
                                                }}
                                            ><i className="bi bi-phone-fill"></i> PhonePe/Google Pay/BHIM UPI</h6>
                                            <hr />
                                            <h6 className="tablinks"
                                                onClick={() => {
                                                    this.updatePaymentMode('paytm')
                                                }}
                                            ><i className="bi bi-wallet"></i> Paytm/Wallets</h6>
                                            <hr />
                                            <h6 className="tablinks"
                                                onClick={() => {
                                                    this.updatePaymentMode('banking')
                                                }}
                                            ><i className="bi bi-bank2"></i> Net Banking</h6>
                                            <hr />
                                            <h6 className="tablinks"
                                                onClick={() => {
                                                    this.updatePaymentMode('emi')
                                                }}
                                            ><i className="bi bi-alipay"></i> EMI/Pay later</h6>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mt-3">
                                        {
                                            displayPaymentMode === 'recommended'
                                                ? <Recommand />
                                                : displayPaymentMode === 'cash'
                                                    ? <CashMode />
                                                    : displayPaymentMode === 'credit'
                                                        ? <Credit />
                                                        : displayPaymentMode === 'upi'
                                                            ? <UpiMode />
                                                            : displayPaymentMode === 'paytm'
                                                                ? <PaytmMode />
                                                                : displayPaymentMode === 'banking'
                                                                    ? <Banking />
                                                                    : <Emi />
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="offer-box mt-4">
                                <div className="d-flex justify-content-between">
                                    <p className="gift-card"><i className="bi bi-gift fs-5"></i> Have a Gift Card?</p>
                                    <p className="app-card">APPLY GIFT CARD</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mt-5">
                            <div className="price-off-bg">
                                <p><b>Price Details(1 item)</b></p>
                                <div className="d-flex justify-content-between off-price-text">
                                    <p className="">Total Price</p>
                                    <p><i className="bi bi-currency-rupee"></i> 5,000</p>
                                </div>

                                <div className="d-flex justify-content-between off-price-text">
                                    <p>Discount on price</p>
                                    <p className="text-primary">-<i className="bi bi-currency-rupee"></i> 3,000</p>
                                </div>

                                <div className="d-flex justify-content-between off-price-text">
                                    <p>Delivery Charges</p>
                                    <p className="text-primary">Free</p>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p><b>Total Amount</b></p>
                                    <p>
                                        <b><i className="bi bi-currency-rupee"></i> 2,000</b>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


//recommand start here

class Recommand extends React.Component {


    render() {
        const { recommended } = this.props;
        return (
            <>
                <div id="recommended" style={{ display: recommended }}>
                    <p><b>Recommended Payment Options</b></p>
                    <form>
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="rdio1" value="opt1" /> Cash on Delivery</label>
                            <img src="assets/images/cash.png" alt="google" className="img-fluid rec-icon" />
                        </div>
                        <div >
                            <div className="d-flex">
                                <div className="offer-box mt-3">
                                    <div className="d-flex">
                                        <p className="mt-4">3</p>
                                        <p className="mt-5">5</p>
                                        <p>6</p>
                                        <p className="mt-5">9</p>
                                    </div>
                                </div>
                                <p className="ms-2 mt-5 num-text">Change Image</p>
                            </div>

                            <input type="text" className="code-text mt-3" placeholder="Enter code shown in above image*" />
                            <span className="code-pay">You can pay via Cash or UPI enabled app at the time of delivery.Ask your delivery executive for these options.</span>
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PLACE ORDER</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="rdio2" value="adfad" /> Google Pay</label>
                            <img src="assets/images/google1.png" alt="google" className="img-fluid rec-icon" />
                        </div>

                        <div >
                            <input type="email" placeholder="Enter UPI Id here" className="form-control mt-3" />
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="rdio3" value="adfadf" /> PhonePe</label>
                            <img src="assets/images/phonpe.png" alt="phonpe" className="img-fluid rec-icon" />
                        </div>

                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}


//Credit start here 

class Credit extends React.Component {
    render() {
        return (
            <>
                <div id="credit" >
                    <p><b>CREDIT/DEBIT CARD</b></p>
                    <p className="code-pay span-text">Please ensure your card can be used for online transactions.</p>
                    <form>
                        <input type="text" className="code-text mt-3" placeholder="Card Number" />
                        <input type="text" className="code-text mt-3" placeholder="Name on card" />
                        <div className="row">
                            <div className="col-md-6">
                                <input type="date" className="code-text mt-3" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="code-text mt-3" placeholder="CVV" />
                            </div>
                        </div>
                        <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-5 w-100">PAY NOW</button>
                    </form>
                </div>
            </>
        )
    }
}

//Upi start here




//banking start here

class Banking extends React.Component {
    render() {
        return (
            <>
                <div id="banking" >
                    <p><b>Net Banking</b></p>

                    <form>
                        <div className="d-flex justify-content-between mt-3">
                            <label className="radio-btn"><input type="radio" name="group1" id="net1" value="opt1" /> SBI Bank</label>
                            <img src="assets/images/sbi.png" alt="google" className="img-fluid net-icon" />
                        </div>
                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <label className="radio-btn"><input type="radio" name="group1" id="net2" value="adfad" /> HDFC Bank</label>
                            <img src="assets/images/hdfc.png" alt="google" className="img-fluid net-icon" />
                        </div>

                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <label className="radio-btn"><input type="radio" name="group1" id="net3" value="adfadf" /> Axis Bank</label>
                            <img src="assets/images/axis.png" alt="phonpe" className="img-fluid net-icon" />
                        </div>

                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <label className="radio-btn"><input type="radio" name="group1" id="net4" value="adfadf" /> Kotak Bank</label>
                            <img src="assets/images/kotak.png" alt="phonpe" className="img-fluid net-icon" />
                        </div>

                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-3">
                            <label className="radio-btn"><input type="radio" name="group1" id="net5" value="adfadf" /> ICICI Bank</label>
                            <img src="assets/images/icici.png" alt="phonpe" className="img-fluid net-icon" />
                        </div>

                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <select className="w-100 mt-4 select-box">
                            <option value="">Other Banks</option>
                            <option value="1">Airtel payments bank</option>
                            <option value="2">Andhra bank</option>
                            <option value="3">Bank of India</option>
                            <option value="4">Canara bank</option>
                            <option value="5">Bank of Baroda Corporate</option>
                            <option value="6">Indian Bank</option>
                            <option value="7">South Indian Bank</option>
                        </select>
                    </form>
                </div>
            </>
        )
    }
}

//emi start here 

class Emi extends React.Component {
    render() {
        return (
            <>
                <div id="emi" >
                    <p><b>Select EMI option</b></p>
                    <form>
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="emi1" value="opt1" /> Credit Card EMI/Debit Card EMI</label>
                            <img src="assets/images/card.png" alt="google" className="img-fluid net-icon" />
                        </div>
                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="emi2" value="adfad" /> ICICI Pay later</label>
                            <img src="assets/images/icici.png" alt="google" className="img-fluid net-icon" />
                        </div>

                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="emi3" value="adfadf" /> Lazypay</label>
                            <img src="assets/images/lazypay.jpg" alt="phonpe" className="img-fluid net-icon" />
                        </div>
                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mt-4">
                            <label className="radio-btn"><input type="radio" name="group1" id="emi4" value="adfadf" /> ZestMoney</label>
                            <img src="assets/images/zest.png" alt="phonpe" className="img-fluid net-icon" />
                        </div>
                        <div >
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                        </div>
                        <hr />
                    </form>
                </div>
            </>
        )
    }
}