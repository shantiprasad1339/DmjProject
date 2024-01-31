import React from 'react';
import bhimImg from '../../assets/images/bhim.png';
import googleImg from '../../assets/images/googlepay.png';
import phonePeImg from '../../assets/images/phonpe.png';



export default class UpiMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setDisplayofUpi: '',
            upiId: '',
        }
        this.setDisplayUpi = this.setDisplayUpi.bind(this);
        this.setUpiId = this.setUpiId.bind(this);
    }

    setUpiId(e) {
        this.setState({ upiId: e.target.value })
    }

    setDisplayUpi(val) {
        this.setState({ setDisplayofUpi: val })
    }



    render() {
        const { upiId, setDisplayofUpi } = this.state;
        return (
            <>
                <div id="upi" >
                    <p><b>Pay Using UPI</b></p>

                    <form>
                        <Upi
                            name=' Enter UPI ID'
                            value='opt1'
                            img={bhimImg}
                            setUpiDisplay={() => this.setDisplayUpi('bhimUpi')}
                        />
                        {
                            setDisplayofUpi === 'bhimUpi'
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

class Upi extends React.Component {

    render() {
        const { value, name, img, setUpiDisplay } = this.props;
        return (
            <>
                <div className="d-flex justify-content-between mt-4" onClick={() => {
                    setUpiDisplay();
                }}>
                    <label className="radio-btn"><input type="radio" name="group1" id="btn1" value={value} />{name}</label>
                    <img src={img} alt="google" className="img-fluid rec-icon" />
                </div>



            </>
        )
    }
}

class UpiInput extends React.Component {
    render() {
        const { setUpi, upiId } = this.props;
        return (
            <>
                <div>
                    <input type="email" placeholder="Enter UPI Id here" className="form-control mt-3" value={upiId} onChange={setUpi} />
                    <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3 w-100">PAY NOW</button>
                </div>
            </>
        )
    }
}


export { Upi, UpiInput };