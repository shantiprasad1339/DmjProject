import React from 'react';
import './privacy.css';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import { useEffect } from 'react';

const Privacy = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <HeaderCon />
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h2><b>**Diwamjewels Privacy Policy**</b></h2>
                        <p className="bottom-border"></p>
                        <h5 className="mt-4"><b>**1. Introduction**</b></h5>
                        <p className="privacy-para">Welcome to Diwamjewels, an online platform dedicated to providing you with beautiful jewelry, handicrafts, and blue pottery products. We are committed to protecting your privacy and the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your data when you use our website, located at diwamjewels.com.</p>
                            <h5 className="mt-4"><b>**2. Information We Collect**</b></h5>
                     

                        <h6><b>2.1. **Personal Information**: </b></h6>
                         <p className="privacy-para">Welcome to Diwamjewels, an online platform dedicated to providing you with beautiful jewelry, handicrafts, and blue pottery products. We are committed to protecting your privacy and the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your data when you use our website, located at diwamjewels.com.</p>
                        <h6><b>2.2. **Account Information**:  </b></h6>
                        <p className="privacy-para">When you create an account on our website, we collect information such as your username and password to facilitate future logins and purchases.</p>
                        <h6><b>2.3. **Usage Information**:  </b></h6>
                        <p className="privacy-para">**: We may collect data on how you interact with our website, including pages visited, products viewed, and actions taken.</p>
                        <h6><b>2.4. **Communication**:  </b></h6>
                       <p className="privacy-para">We may collect information from your communications with us, including emails, chat messages, or other correspondence.</p>

                       <h5 className="mt-4"><b>**3. How We Use Your Information**</b></h5>
                       <h6><b>3.1. **Order Processing**:   </b></h6>
                       <p className="privacy-para">We use your personal information to process and fulfil your orders, including order confirmation, shipping, and customer support.</p>

                       <h6><b>3.2. **Account Management**:   </b></h6>
                       <p className="privacy-para">Your account information is used to manage and maintain your account on our website.</p>

                       <h6><b>3.3. **Customer Support**:   </b></h6>
                       <p className="privacy-para">We may use your information to provide customer support, address inquiries, and resolve issues.</p>

                       <h6><b>3.4. **Marketing**:   </b></h6>
                       <p className="privacy-para">With your consent, we may send you promotional emails or updates about our products and services. You can opt out of these communications at any time.</p>
                       <h5 className="mt-4"><b>**4. Sharing Your Information**</b></h5>
                       <h6><b>4.2. **Legal Compliance**:   </b></h6>
                       <p className="privacy-para">When required by law, in response to court orders, or to defend our rights, privacy, safety, or property, we may be required to disclose your information.</p>

                       <h5 className="mt-4"><b>**5. Data Security**</b></h5>
                       <p className="privacy-para">We take reasonable measures to safeguard your data and protect it from unauthorized access, disclosure, alteration, or destruction. However, please understand that no data transmission or storage method can be guaranteed to be 100% secure.</p>

                       <h5 className="mt-4"><b>**6. Your Choices**</b></h5>
                       <h6><b>6.1. **Account Settings**:  </b></h6>
                       <p className="privacy-para">You can review and update your account information by logging into your account on our website.</p>
                       <h6><b>6.2. **Marketing Communications**:  </b></h6>
                       <p className="privacy-para">You can opt out of marketing communications by following the unsubscribe instructions in the emails you receive from us.</p>
                    
                       <h5 className="mt-4"><b>**7. Children's Privacy**</b></h5>
                       <p className="privacy-para">Young people under the age of 18 are not permitted on our website. We never knowingly gather or store data from children under this age.</p>
                       <h5 className="mt-4"><b>**8. Changes to this Privacy Policy**</b></h5>
                       <p className="privacy-para">This Privacy Policy may be updated from time to time. Any changes will be posted here, and the "Last Updated" date will be updated accordingly. Please review this policy on a regular basis.</p>
                       <h5 className="mt-4"><b>**9. Contact Us**</b></h5>
                       <p className="privacy-para">If you have questions or concerns about our Privacy Policy, or if you would like to exercise your data rights, please contact us.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Privacy;