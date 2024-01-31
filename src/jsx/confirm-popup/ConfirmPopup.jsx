import React, { useState } from 'react';
import './confirm-popup.css';

const ConfirmPopup = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
    };
    return (
        <>
         {isVisible && (
        <div className='confirm-popup'>
        <div className='text-end'><i className="bi bi-x-circle fs-4 text-danger" onClick={handleClose}></i></div>

        <p className='fnt-sz-pop-para'>Our team will contact you shortly regarding confirmation.</p>
        </div>

        )}
        </>
    )
}

export default ConfirmPopup;