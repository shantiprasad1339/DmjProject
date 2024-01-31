import React from 'react';
import { Upi, UpiInput } from '../paymentMode/UpiMode';
import googleImg from '../../assets/images/bhim.png';
import phonePeImg from '../../assets/images/phonpe.png';
import paytmImg from '../../assets/images/paytm.png';


export default class PaytmMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setDisplayofUpi: '',
            upiId: '',
            setWallet: 'none',
        }
        this.setDisplayUpi = this.setDisplayUpi.bind(this);
        this.setUpiId = this.setUpiId.bind(this);
    }



    setUpiId(e) {
        this.setState({ upiId: e.target.value })
    }

    setDisplayUpi(val) {
        this.setState({
            setDisplayofUpi: val,
            setWallet: 'none',
        })
    }
    render() {
        const { upiId, setDisplayofUpi, setWallet } = this.state;


        return (
            <>
                <div id="paytm" >
                    <p><b>Select wallet to pay</b></p>

                    <form>
                        <div className="d-flex justify-content-between mt-4" onClick={() => { this.setState({ setWallet: 'block' }) }}>
                            <label className="radio-btn"><input type="radio" name="group1" id="pay1" value="opt1" /> Paytm (wallet,Postpaid)</label>
                            <img src={paytmImg} alt="google" className="img-fluid rec-icon" />
                        </div>
                        <div style={{ display: setWallet }}>
                            <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                            <hr />
                        </div>

                        <Upi
                            name=' Google Pay'
                            value='opt2'
                            // upiId={googleId}
                            img={googleImg}
                            setUpiDisplay={() => this.setDisplayUpi('googlePay')}
                        />
                        {
                            setDisplayofUpi === 'googlePay'
                                ? <div>
                                    <UpiInput
                                        setUpi={this.setUpiId}
                                        upiId={upiId}
                                    />
                                    <hr />
                                </div>
                                : <div></div>
                        }
                        <Upi
                            name=' PhonePe'
                            value='opt3'
                            // upiId={phonepeId}
                            img={phonePeImg}
                            setUpiDisplay={() => this.setDisplayUpi('phonePe')}
                        />
                        {
                            setDisplayofUpi === 'phonePe'
                                ? <div>
                                    <UpiInput
                                        setUpi={this.setUpiId}
                                        upiId={upiId}
                                    />
                                    <hr />
                                </div>
                                : <div></div>
                        }
                    </form>
                </div>
            </>
        )
    }
}



