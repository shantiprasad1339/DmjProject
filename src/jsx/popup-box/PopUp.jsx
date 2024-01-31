import React from 'react';
import './popup.css';
import popupimg from '../../assets/images/popimg.jpg';

const PopUp = () => {
    return (
        <>
          <div className="popup-box-bg">
            <div className='d-flex'>
             <div className='popup-img-box'><img src={popupimg} alt="popup" /></div>
             <div className='ms-3'>
                <h3 className='popup-heading'>Please Login here</h3>
                <p className='popup-para-fnt'>Please login here for better experience !</p>
                <div>
                    <button className='popup-btn'>Log In</button>
                    <button className='popup-btn'>Sign Up</button>
                </div>
             </div>
            </div>
          </div>
        </>
    )
}
export default PopUp;