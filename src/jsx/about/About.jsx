import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import visionImg1 from '../../assets/images/icons8-ophthalmology-64.png';
import visionImg2 from '../../assets/images/icons8-rocket-50.png';
import SubscribenMail from '../subscribe/SubscribenMail';
// import managerImg from '../../assets/images/Rectangle 119.png';
import Banner from '../Banner/Banner';
import ashuimage from '../../assets/images/ashu.png'
import profileimg from '../../assets/images/827.jpg';
import bannerImg from '../../assets/images/banner/dmj-banner.jpg'

export default class About extends React.Component {

    constructor(props){
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {

        return (
            <>
                <HeaderCon />
                <Navbar />

                {/* //first banner starts here */}

                <Banner
                    title='About Us'
                    fullTitle='Home / about us'
                    bannerImg ={bannerImg}
                />
                <div className="container">
                    <h3 className="mt-5 text-center about-heading"><b>About Us</b></h3>
                    <div className="row">
                        <div className="col-md-6 mt-3">
                            <p className="para-text mt-3">
                                <b>
                                DMJ is founded by Ashok Samant & Babla Burman in 1992. Earlier it was a traditional offline trading, which has now established its online seller platform for Overseas Jewelers.</b>
                            </p>
                              
                              <p className="para-text">Diwam Jewels also known as DMJ is an initiative for the root level Designers and Jewelry Makers to explore the world. DMJ has designed this concept, keeping thought of promoting the original jewelry designers and manufacturer in front, who are the grass root of the industry.</p>
                           
                        </div>

                        <div className="col-md-6 mt-3">
                            <p className="para-text mt-3">
                            DMJ is well known for trading in Silver, Gold, Bras, GS and Other fashionable/ traditional jewelries among the sellers and buyers. Its main focus is to provide a platform, with direct trading power. DMJ as a platform is a direct channel to the traders to sell and buy their Jewelry, Precious and Semi Precious Stones including other luxury items overseas. Sellers are getting Seller Account, Video and Photo Shoots, Photo Editing, Pick up and Delivery, Relationship Management Team including Sales and Marketing executives and 24/7 customer care support for no price.
                            </p>

                          
                        </div>
                    </div>

                </div>

                <div className="container">
                    <VisionRow
                        imgVision={visionImg1}
                        title="Creating perfect web solutions"
                        details="We are idea-driven, working with a strong focus on design and user experience. Our projects should engage your audience, we want to create wonderful digital things that people love to be part of and use. That's what your brand and audience deserve."
                    />
                    <VisionRow
                        imgVision={visionImg2}
                        title="What we believe in"
                        details=" We aim at pioneering more than following and thus the team of skilled and very creative members brainstorms and is persistent in bringing up new and unmatched ideas which align with all your designing needs."
                    />
                </div>
                <div className="container">
                    <h3 className="mt-5 text-center about-heading"><b>Our Management</b></h3>

                    <div className="row">
                        <ManagementCard
                            name='Ashutosh Burman'
                            img={ashuimage}
                            position='Founder'
                            about=' A successful senior corporate executive, MBA from IIM Ahmedabad, with over 35 years of experience and expertise in Marketing, Operations and Strategy. She has worked with some of the best brands like GSK, Lakme, India Today,
                                Fabindia and many more and continues to work in areas relating to craft, livelihoods and heritage & culture.'
                        />
                        <ManagementCard
                            name='.......'
                            img={profileimg}
                            position='...'
                            about=' A successful senior corporate executive, MBA from IIM Ahmedabad, with over 35 years of experience and expertise in Marketing, Operations and Strategy. She has worked with some of the best brands like GSK, Lakme, India Today,
                                Fabindia and many more and continues to work in areas relating to craft, livelihoods and heritage & culture.'
                        />
                        {/* <ManagementCard
                            name='.......'
                            img={profileimg}
                            position='...'
                            about=' A successful senior corporate executive, MBA from IIM Ahmedabad, with over 35 years of experience and expertise in Marketing, Operations and Strategy. She has worked with some of the best brands like GSK, Lakme, India Today,
                                Fabindia and many more and continues to work in areas relating to craft, livelihoods and heritage & culture.'
                        /> */}
                    </div>
                </div>
                <SubscribenMail />
                <Footer />
            </>
        )
    }
}


class VisionRow extends React.Component {
    render() {
        const { imgVision,title,details} = this.props;
        return (
            <>
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <div className="d-flex">
                            <img src={imgVision} className="img-fluid vision-img" alt="Vision" />

                            <div className="ms-4 mt-2">
                                <h4 className="about-heading"><b>{title}</b></h4>

                                <p className="para-text">{details}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}


class ManagementCard extends React.Component {
    render() {
        const { name, img, position, about } = this.props;
        return (
            <>
                <div className="col-md-4 mt-4">
                    <div className="card border-0">
                        <div className="text-center"><img src={img} className="img-fluid about-card-img" alt="Person" /></div>

                        <div className="card-body">
                            <h6 className="text-center"><b>{name} </b></h6>

                            <p className="text-center">
                                <b>{position}</b>
                            </p>

                            <p className="card-text para-text">
                                {about}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}