import * as React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import creditcard from "./images/credit.png";
import paypal from "./images/paypal.png";
import qr from './images/qr.jpeg';
import upilogo from "../../assets/images/bhim.png";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const url = "https://api.diwamjewels.com/DMJ/";
var userId = localStorage.getItem('userId')

const Payment = () => {

    const { orderId } = useParams();


    return (
        <>
            <HeaderCon />
            <Navbar />
            <div className='checkout-bg'>
                <ControlledAccordions />
                <PaymentInputsBox
                    orderId={orderId}
                    userId={userId}
                />
            </div>
        </>
    );
}

export default Payment;







export function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [formData, setFormData] = useState({
        cardHolderName: "Account name - A2G Traders Pvt ltd",
        cardNumber: "Account Number -8045832778",
        expirationDate: "IFSC Code - KKBK0003549",
        cvv: "SWIFT CODE -KKBKINBBXXX",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div style={{ userSelect: 'all' }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography sx={{ width: '80%', flexShrink: 0 }}>
                        <div className="d-flex">
                            <img src={creditcard} alt="credit" className="cr-cd-img" />
                            <h6 className="opt-dlry-fnt mt-1">Pay By Bank</h6>
                        </div>
                    </Typography>
                    {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className="p-2">
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="input-box-bdr mt-2 w-100"
                                        placeholder="Card Holder Name"
                                        name="cardHolderName"
                                        value={formData.cardHolderName}
                                        // onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="input-box-bdr mt-2 form-control"
                                        placeholder="Card Number"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        // onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="input-box-bdr mt-2 w-100"
                                        placeholder="Expiration Date"
                                        name="expirationDate"
                                        value={formData.expirationDate}
                                        // onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="input-box-bdr mt-2 w-100"
                                        placeholder="CVV"
                                        name="cvv"
                                        value={formData.cvv}
                                        // onChange={handleInputChange}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '80%', flexShrink: 0 }}>
                        <div className="d-flex">
                            <img src={upilogo} alt="credit" className="cr-cd-img" />
                            <h6 className="opt-dlry-fnt mt-1">Pay By Scanner</h6>
                        </div>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>

                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className="d-flex p-2 flex-column">

                            {/* <input
                                type="text"
                                className="input-box-bdr"
                                placeholder="123@paytm"
                                disabled
                            /> */}
                            <img src={qr} alt="qr" style={{ maxWidth: '400px', height: '300px', width: '100%',margin:'auto' }} />
                            {/* <button className="check-verify-btn">Verify</button> */}
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            {/* <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Advanced settings
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        Filtering has been entirely disabled for whole web server
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
                        amet egestas eros, vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
            </Accordion> */}
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                     <Typography sx={{ width: '80%', flexShrink: 0 }}>
                        <div className="d-flex">
                            <img src={upilogo} alt="credit" className="cr-cd-img" />
                            <h6 className="opt-dlry-fnt mt-1">Pay By UPI ID</h6>
                        </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <form action="" className='d-flex p-3'>
                            <input type="text"  className="input-box-bdr" placeholder='Enter your UPI ID' />
                            <button className='px-5 py-2 ms-2 border-0 text-white rounded bg-dark'>Save</button>
                        </form>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const PaymentInputsBox = ({ userId, orderId }) => {
    const [utrNumber, setUtrNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [screenshots, setScreenshots] = useState(null);

    const navigate = useNavigate()

    const handleUtrNumberChange = (e) => {
        const inputValue = e.target.value;

        // Define a maximum length for UTR number (e.g., 10 characters)
        const maxUtrNumberLength = 16;

        if (inputValue.length <= maxUtrNumberLength) {
            setUtrNumber(inputValue);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const inputValue = e.target.value;

        // Define a maximum length for phone number (e.g., 12 characters)
        const maxPhoneNumberLength = 12;

        if (inputValue.length <= maxPhoneNumberLength) {
            setPhoneNumber(inputValue);
        }
    };

    const handleScreenshotsChange = (e) => {
        setScreenshots(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let payDetail = {
            "utrNumber": utrNumber,
            "screenShot": "",
            "mobile": phoneNumber,
            "userId": userId,
            "orderId": orderId
        }
        try {
            const payRes = await axios.post(url + 'api/v1/userPayment', payDetail);
            if(payRes.data.status ==="OK"){
                alert('Payment Done We Will Reach You Shortly')
                navigate('/')
                localStorage.removeItem('cart')
            }
        }
        catch (err) {
            console.log(err)
        }

        // Additional validation or form submission logic can be added here.
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container-fluid">
                    <div className='row'>
                        <div className="col-md-6 mt-3">
                            <input
                                type="text"
                                placeholder='Enter your UTR/Transiction  number'
                                className='form-control'
                                value={utrNumber}
                                onChange={handleUtrNumberChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mt-3">
                            <input
                                type="number"
                                placeholder='Enter your phone number'
                                className='form-control'
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                required
                            />
                        </div>
                        {/* <div className='mt-3'>
                            <input
                                type="file"
                                placeholder='Enter your screenshots'
                                className='form-control'
                                onChange={handleScreenshotsChange}
                                required
                            />
                        </div> */}
                    </div>
                </div>
                <div className='text-center mt-4'><button type="submit" className='payment-subbtnv'>Submit</button></div>
            </form>

        </>
    )
}