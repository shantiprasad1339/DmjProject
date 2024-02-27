import { useEffect, useState } from "react";
import "./dashboard.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import axios from "axios";

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
 
  const [addressData, SetAddressData] = useState();
  const [editIndex, setEditIndex] = useState(null);
const[address,setAddress] = useState({
    name:'',
    area:'',
    pincode:'',
    mobile:'',
    city:'',
    state:''
})
  const userId = localStorage.getItem("userId");

  function getUserProfile() {
    axios
      .get("https://api.diwamjewels.com/DMJ/api/v1/address/userId/" + userId)
      .then((res) => {
        // console.log([res.data.data]);
        const addressesArray = Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data];

        SetAddressData(addressesArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserProfile();
  }, []);
  const handleShow = (index) => {
    setEditIndex(index);
  };

  const handleClose = () => {
    setEditIndex(null);
 axios.put("https://api.diwamjewels.com/DMJ/api/v1/address/"+userId+"/"+address.id).then((res)=>{
      console.log(res);
    })
    
  };
 
  
  function handelAddress(event) {
    const { name, value } = event.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  }
  function handleAddValue(index,item){
    console.log(item);
    handleShow(index)
    setAddress(prevAddress => ({
      ...prevAddress,
      name: item.name,
      area:item.area,
      pincode:item.pincode,
      mobile:item.pincode,
      city:item.city,
      state:item.state,
      id:item.id
    }));
  }
  function removeAddress(id){
    axios.delete("https://api.diwamjewels.com/DMJ/api/v1/address/"+userId+"/"+id).then((res)=>{
      console.log(res);
    })
  }
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
        <div key={index}>
          <div className="user-add-info">
            <p className="user-name">{item.name}</p>
            <DeleteForeverIcon className="address-line"></DeleteForeverIcon>
          </div>
          <p className="address-text">{item.area}</p>
          <p className="address-text">{item.pincode}</p>
          <p className="address-text">{item.mobile}</p>
          <p className="address-text">{item.city}</p>
          <p className="address-text">{item.state}</p>

          <div className="user-add-info">
            <h6 className="ed-text" onClick={() => handleAddValue(index,item)}>
              EDIT
            </h6>
            <h6 className="ed-text" onClick={ removeAddress(item.id)}>REMOVE</h6>
          </div>
          <hr />

          <Modal show={editIndex === index} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Small"
                  name='name'
                  aria-describedby="inputGroup-sizing-sm"
                  value={address.name}
                  onChange={handelAddress}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Small"
                  name='area'
                  aria-describedby="inputGroup-sizing-sm"
                  value={address.area}
                  onChange={handelAddress}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Small"
                  name='pincode'
                  aria-describedby="inputGroup-sizing-sm"
                  value={item.pincode}
                  onChange={handelAddress}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Small"
                  name='city'
                  aria-describedby="inputGroup-sizing-sm"
                  value={address.city}
                  onChange={handelAddress}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Small"
                  name='state'
                  aria-describedby="inputGroup-sizing-sm"
                  value={address.state}
                  onChange={handelAddress}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Small"
                  name='mobile'
                  aria-describedby="inputGroup-sizing-sm"
                  value={address.mobile}
                  onChange={handelAddress}
                />
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
        </div>
      ))}
      </div>
    </>
  );
};

export default SaveAddress;
