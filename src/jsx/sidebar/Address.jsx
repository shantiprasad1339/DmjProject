import { useEffect, useState } from 'react';
import './dashboard.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const url = "https://api.diwamjewels.com/DMJ/";

const SaveAddress = () => {
    return (
        <>
            <div className="sidebar-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                   
                            <Address />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const Address = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addressData, SetAddressData] = useState()


    const userId = localStorage.getItem("userId")



    function getUserProfile() {
        axios.get('https://api.diwamjewels.com/DMJ/api/v1/address/' + userId)
            .then((res) => {
                console.log([res.data.data]);
                const addressesArray = Array.isArray(res.data.data)
                ? res.data.data 
                : [res.data.data];

                SetAddressData(addressesArray);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUserProfile()
    }, [])
    return (
        <>
        <div className="user-add-info mt-5">
                <h6>Saved Addresses</h6>
                <button className="add-new">
                    <i className="bi bi-plus"></i> ADD NEW ADDRESS
                </button>
            </div>
            <h4 className="mt-4">Default Address</h4>
            <div className="shadow-sm add-info-box">

                {addressData?.map((item, index) => (
                        <>
                            <div className="user-add-info">
                                <p className="user-name">{item.name}</p>
                                <DeleteForeverIcon className="address-line"></DeleteForeverIcon>
                            </div>
                            <p className="address-text">
                              {item.area}
                            </p>
                            <p className="address-text">{item.pincode}</p>
                            <p className="address-text">{item.mobile}</p>
                            <p className="address-text">{item.city}</p>
                            <p className="address-text">{item.state}</p>

                            <hr></hr>
                            <div className="user-add-info">
                                <h6 className="ed-text" onClick={handleShow}>EDIT</h6>
                                <h6 className="ed-text">REMOVE</h6>
                            </div>
                        </>
                    )
                )}
 


            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <Form.Control aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SaveAddress;




