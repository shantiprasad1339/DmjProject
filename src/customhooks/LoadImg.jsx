import React, { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';




function LoadImg({ img, styleClass }) {


    const [isImgLoad, setIsImageLoad] = useState(false)


    useEffect(() => {
        // Check if the image is loaded from the server (you can adjust this condition as needed)
        if (img) {
            setIsImageLoad(true);
        }
    }, [img]);

    return (
        <>
            {<LazyLoadImage className={styleClass} src={img} effect="blur" />}
        </>
    )
}

export { LoadImg }