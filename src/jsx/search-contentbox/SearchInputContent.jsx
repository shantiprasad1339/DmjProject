import React, { useState } from 'react';
import './search-input-box.css';
import timer from '../../assets/images/timer.png'
import image1 from '../../assets/images/earring.jpg'
import searchIcon from '../../assets/images/search.png';

const SearchInputContent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
    return (
        <>

<div className="nav-box-search mt-2 mb-3" onClick={toggleOpen}>
                        <input type="text" className='nav-search' />
                        <img src={searchIcon} className='nav-search-icon' />
                    </div>

            
            
            {isOpen && (
          <>
          <div className='srch-ipt-cntet-bx'>
            <SearchDetails title="Jewellery" />
            <SearchDetails title="Handi Craft" />
            <SearchDetails title="Blue Pottery" />
            <h6 className='mt-2'><b>Discover More</b></h6>
            <ImageWithSearch detail="Rings" image={image1} />
            <ImageWithSearch detail="Necklace" image={image1} />
            <ImageWithSearch detail="Bangles" image={image1} />
            </div>
          </>
        )}
            
        </>
    );
}

export default SearchInputContent;


const SearchDetails = (props) => {
    return (
        <>
<div className='d-flex'>
                  <img src={timer} alt="icon" className='timer-iconsz' />
                  <p className='srch-ipt-detail-ptag'>{props.title}</p>
                </div>
        </>

    );
}

const ImageWithSearch = (props) => {
    return (
        <>
         <div className='d-flex mt-2'>
         <img src={props.image} alt="icon" className='search-img-dtl1' />
                  <p className='srch-ipt-detail-ptag mt-2'>{props.detail}</p>
         </div>
        </>
    )
}