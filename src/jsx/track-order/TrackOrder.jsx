import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import trackorder from '../../assets/images/trackorder.png'
// import trackbg from '../../assets/images/trackbg.jpg'
import { NavLink } from 'react-router-dom'
export default class TrackOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            trakEmail: ''
        }
        this.trackOrder = this.trackOrder.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    trackOrder(e) {
        e.preventDefault();
        console.log('fired');
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {
        const { orderId, trakEmail } = this.state;
        return (
            <>
                <HeaderCon />
                <Navbar />
                 <div className='trackorder-bg'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-5 mb-5">
                        <div className='text-center mt-2'><img src={trackorder} alt="track order" className="track-order-img"/></div>
                            <h5 className="mt-4 text-center track-order-fnt"><b>Track Your Order</b></h5>

                            <div className="display-track">
                                <form onSubmit={this.trackOrder}>
                                    {/* <label htmlFor="track_order" className="mt-3 label-font">Order ID</label><br /> */}

                                    <input type="text" className="form-control track-input-box" id="track_order" placeholder="Eg:DMJ987"
                                        value={orderId}
                                        onChange={e => this.setState({ orderId: e.target.value, })}
                                    />

                                    {/* <label htmlFor="track_id" className="mt-3 label-font">Phone Number / Email ID</label><br />

                                    <input type="email" className="box-style w-100" id="track_id" placeholder="Phone Number / Email ID"
                                        value={trakEmail}
                                        onChange={(e => this.setState({ trakEmail: e.target.value, }))}
                                    /> */}

                                    <button className="track-order-btn" type='submit'>Track Order</button>
                                </form>
                            </div>

                            <div className="text-center mt-5"><h6><b>Need Help ? <NavLink to='/contactUs'><span style={{color:'#b79d33',cursor:'pointer',fontSize:'20px'}}>Contact Us</span></NavLink></b></h6></div>
                        </div>
                    </div>
                </div>
                  </div>
                <Footer />
            </>
        )
    }
}