import React from "react";
import cardimg from './box.png';
import userimg from './user.png';


import './dashboard.css';
export default class Overviewpage extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <Userprofile />
                    <div className="row">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <Logoutbutton />
                </div>
                </div>
            </>
        )
    }
}

class Card extends React.Component {
    render() {
        return (
            <>
                <div className="col-md-4 mt-3">
                    <div className="view-box text-center">
                        <img src={cardimg} alt="Orders" className="img-fluid mt-3" />
                        <h6 className="mt-3">Orders</h6>
                        <p className="view-text">Check your order status </p>
                    </div>
                </div>
            </>
        )
    }
}

class Logoutbutton extends React.Component {
    render() {
        return (
            <>
                <button className="bg-danger text-white px-3 py-2 border-0 rounded mt-4">Logout</button>
            </>
        )
    }
}

class Userprofile extends React.Component {
    render() {
        return (
            <>
                <div className="user-bg">
                    <div className="text-end"><button className="edit-info">Edit Profile</button></div>
                    <div className="userinfo">
                        <img src={userimg} alt="user" className="img-fluid" />
                        <p className="usermail">ankit.samant.ank@gmail.com</p>
                    </div>
                </div>
            </>
        )
    }
}