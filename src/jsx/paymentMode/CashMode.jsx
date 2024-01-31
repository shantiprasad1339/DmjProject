import React from "react";

//cash start here 

export default class CashMode extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    render() {
        return (
            <>
                <div id="cash" >
                    <p><b>Pay on delivery (cash/UPI)</b></p>
                    <div className="d-flex">
                        <div className="offer-box mt-3">
                            <div className="d-flex">
                                <p className="mt-4">3</p>
                                <p className="mt-5">5</p>
                                <p>6</p>
                                <p className="mt-5">9</p>
                            </div>
                        </div>
                        <p className="ms-2 mt-5 num-text">Change Image</p>
                    </div>

                    <form>
                        <input type="text" className="code-text mt-3" placeholder="Enter code shown in above image*" />
                        <span className="code-pay">You can pay via Cash or UPI enabled app at the time of delivery.Ask your delivery executive for these options.</span>
                        <button className="px-5 py-2 border-0 text-white bg-primary rounded mt-3">PLACE ORDER</button>
                    </form>
                </div>
            </>
        )
    }
}

