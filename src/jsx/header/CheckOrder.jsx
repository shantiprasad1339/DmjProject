import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./model.css";
import axios from "axios";
export default function CheckOrder({ isShow, handleModel }) {
  // const [show, setShow] = useState(true);
  const [city, setCity] = useState('')
  const [select, setSelect] = useState();
const [code,setCode] = useState()
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  function getUserCountry(e) {
    e.preventDefault()
    const zipodeApi = "https://shark-app-cnaaz.ondigitalocean.app/api/data/"
    axios.get(zipodeApi + code).then((res) => {
      console.log(res.data.data.District);
      setCity([res.data.data.District])
    })
  }
function accessCity (e){
setSelect(e.target.value);
}
function setUserCity (){
  localStorage.setItem("userLocation",city)
  console.log("city==>>",city);
  handleModel()
}
// console.log(select);
  return (
    <>


      <Modal show={isShow} onHide={handleModel} className='check-local'>
        <Modal.Header closeButton>
          <Modal.Title>Chooes your loction</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Delivery options and delivery speed may very for different location!
        </Modal.Body>
        <Button className="btn-1">Sign in to see your address</Button>
        <hr />

        <div className="box">
          <form>
            <div className="box-1">
              <label htmlFor="">Enter a Zip Code</label> <br />
              <input type="text" onChange={(e) => setCode(e.target.value)} />
              <button className="btn-2 " onClick={getUserCountry}>Apply</button>
            </div>
            <hr className="hr-tag" />
            <select
           
              value={select}
              className="select"
              onChange={(e) => {
                
                accessCity(e)
              }}
            >
            {/* <option value="">select</option> */}
              {city && city.map((item) => {

                return (
                  <>
                    <option value={item}>{item}</option>

                  </>
                )})
              }
            
            </select>
          </form>
        </div>
        <div>
          <Button className="btn-3" onClick={setUserCity}>Save</Button>
        </div>
      </Modal>

    </>
  );
}
