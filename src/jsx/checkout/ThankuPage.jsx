import React from 'react'
import './thankupage.css';
import { NavLink } from 'react-router-dom';

function ThankuPage() {
  return (
    <div className='thank-box'>
     <h1 className='thk-heading'>Thank You!</h1>
     <h6 className='thk-info-para'>Your Order Has Been Placed. Please Check Your Email for Your Order Information.</h6>
     <NavLink to="/profile"><button className='cnt-shp-btn-vw' >Continue Shopping</button></NavLink>
     <hr />
     <h6 className='thk-info-para'>Need Support? <NavLink to="/contactUs">Contact Us</NavLink></h6>
    </div>
  )
}

export default ThankuPage;
