import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import '../../assets/css/about.css';
import '../../assets/css/style.css';
// import './assets/css/style2.css';
import '../../assets/css/billing.css';
// import '../../assets/css/bootstrap.min.css';
import '../../assets/css/buy.css';
import '../../assets/css/cart.css';
import '../../assets/css/contact.css';
import '../../assets/css/faq.css';
import '../../assets/css/jewel.css';
import '../../assets/css/blog.css';
import '../../assets/css/reactEdit.css';
import '../../assets/css/owl.carousel.min.css';
import Footer from '../footer/Footer';




export default class Alljsx extends React.Component {
    render() {
        return (
            <>
                <HeaderCon />
                <Navbar />

                {/* <JwelleryDetails /> */}

                <Footer />
            </>
        )
    }
}