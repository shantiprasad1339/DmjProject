import React from 'react';
// import upiimg from './upi.png';
import './dashboard.css';


export default class Saveaddress extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Newaddress />
                                <Address />
                                <Address />
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Newaddress extends React.Component {
    render() {
        return (
            <>
             <div className="user-add-info mt-5">
               <h6>Saved Addresses</h6>
               <button className="add-new"><i className="bi bi-plus"></i> ADD NEW ADDRESS</button>
             </div>
            </>
        )
    }
} 

class Address extends React.Component {
    render() {
        return (
            <>
            <h6 className="mt-4">Default Address</h6>
            <div className="shadow-sm add-info-box">
              <div className="user-add-info">
                <p className="user-name">Ankit Samant</p>
                <p className="address-line">Office</p>
              </div>
              <p className="address-text">31 Arjun Colony, Fakiro Ki Doongri, Govind Nagar East, Behind Brahampuri
               Amer Road</p>
               <p className="address-text">Jaipur - 302002</p>
               <p className="address-text">Rajasthan</p>
               <p className="address-text">Mobile: 8005779031</p>

               <hr></hr>
               <div className="user-add-info">
                 <h6 className="ed-text">EDIT</h6>
                 <h6 className="ed-text">REMOVE</h6>
               </div>
            </div>
            </>
        )
    }
}