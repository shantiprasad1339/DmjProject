import React from 'react';
import upiimg from './upi.png';
import './dashboard.css';

export default class UPI extends React.Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Savedvpa />
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

class Savedvpa extends React.Component {
    render() {
        return (
            <>
                <div className="mt-5">
                    <img src={upiimg} alt="Card" className="img-fluid" />
                </div>
                <h6 className="mt-3">SAVE YOUR VPA WHILE DOING A PAYMENT</h6>
                <p className="text-muted">It's convenient to pay with saved VPAs.</p>
            </>
        )
    }
}