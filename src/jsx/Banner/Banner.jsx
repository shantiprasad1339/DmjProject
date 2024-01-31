import React from 'react';
import bannerImg from '../../assets/images/Rectangle 124.png';
import dmjbanner from '../../assets/images/dmjbanner.png'

export default class Banner extends React.Component {
    render() {
        const { title, fullTitle, children, bannerImg } = this.props;
        return (
            <>
                <div className="banner">
                    <img src={dmjbanner} className="img-fluid banner-img" alt="Banner" />

                    <div className="banner-text text-center">
                        <h3><b>{title}</b></h3>

                        <p>{children}{fullTitle}</p>
                    </div>
                </div>
            </>
        )
    }
}