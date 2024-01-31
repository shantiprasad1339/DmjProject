import React from 'react';
import './dashboard.css';

export default class Couponpage extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            
                                <Coupon />
                                <Coupon />
                            
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Coupon extends React.Component {
    render() {
        return (
            <>
            <div className="coupon-bg shadow-sm">
                <div className="d-flex">
                    <h6 className="mt-3 text-success">60% OFF</h6>
                    <p className="borderline"></p>
                    <div className="ms-3 mt-3">
                        <p className="coupon-text">On minimum purchase of Rs. 0</p>
                        <p className="code-text">Code: DAMENSCH150</p>
                    </div>
                </div>
                <hr></hr>
                <div className="d-flex justify-content-between">
                    <p className="coupon-text">Expiry : <b>MAR 31 2023</b> | 11:59:00 PM</p>
                    <h6 className="del-font">Details</h6>
                </div>
                </div>
            </>
        )
    }
}