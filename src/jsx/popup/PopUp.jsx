import React from 'react';
import './popup.css';
import popupimg from '../../assets/images/popimg.jpg';
import { NavLink } from 'react-router-dom';

const PopUp = () => {
  return (
    <>
      <div className="popup-box-bg">
        <div className='d-flex'>
          <div className='popup-img-box'><img src={popupimg} alt="popup" /></div>
          <div className='ms-3'>
            <h3 className='popup-heading'>Please Login here</h3>
            <p className='popup-para-fnt'>Please login here for better experience !</p>
            <div className='popupNavlink'>
              <NavLink className='popup-btn' to='/Signup2'>Login</NavLink>
              <NavLink className='popup-btn ms-2' to='/newlogin'>Signup</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PopUp;