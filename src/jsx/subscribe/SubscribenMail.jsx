import React from 'react';

export default class SubscribenMail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mailBox: ''
        }

        this.setMailBox = this.setMailBox.bind(this);
    }
        
    setMailBox(e) {
        this.setState({ mailBox: e.target.value })
    }

    render() {

        return (
            <>

                <div className="letter-bg mt-5 p-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h5 className="mt-3"><b>SUBSCRIBE OUR NEWSLETTER</b></h5>

                                <p>Subscribe to be the first to know about Sales, Events and Special Offers!</p>
                            </div>

                            <div className="col-md-6 mt-3">
                                <form className="subscribe_form">
                                    <div className="input-group">
                                        <input type="email" className="form-control" value={this.state.mailBox} onChange={this.setMailBox} />

                                        <span className="input-group-btn">
                                            <button className="btn btn-default" type="button">subscribe</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}