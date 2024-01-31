import React from 'react';
import savecard from './orders.png';
import './dashboard.css';


export default class SavedCardPage extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Couponcard />
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Couponcard extends React.Component {
    render() {
        return (
            <>
                <div>
                    <img src={savecard} alt="Card" className="img-fluid savecard-img" />
                </div>
                <button className="retry-btn">RETRY</button>
            </>
        )
    }
}