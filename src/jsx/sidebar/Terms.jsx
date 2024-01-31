import React from 'react';
import './dashboard.css';


export default class Policy extends React.Component {
    render() {
        return (
            <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mt-5">
                            <h4 className="text-muted text-center">Privacy Policy</h4>
                            <Privacy />
                            <Privacy />
                            <Privacy />
                        </div>
                    </div>
                </div>
                </div>
            </>
        )
    }
}

class Privacy extends React.Component {
    render() {
        return (
            <>
                <div className="mt-4">
                    <h6>Introduction</h6>
                    <p className="policy-text">
                        We value the trust you place in us and recognize the importance of secure
                        transactions and information privacy. This Privacy Policy describes how Myntra Designs Private Limited
                        and its affiliates (collectively "Myntra, we, our, us") collect, use, share, protect or otherwise process
                        your personal information through Myntra website https://www.myntra.com. While you may be able to browse
                        certain sections of the Platform without registering with us, however, please note we do not offer any
                        product/service under this Platform outside India. Your personal information will primarily be stored and
                        processed in India and may have data protection laws that are different from those that apply in the
                        country in which you are located. By visiting this Platform, providing your information or availing any
                        product/service offered on the Platform, you expressly agree to be bound by the terms and conditions of
                        this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree
                        to be governed by the laws of India including but not limited to the laws applicable to data protection
                        and privacy.
                        If you do not agree please do not use or access our Platform.</p>
                </div>
            </>
        )
    }
}

