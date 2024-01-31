import React, { useState } from "react";
import "./orderpage.css";
import img1 from "../../assets/images/ring1.jpg";
import img2 from "../../assets/images/companyicon.png";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StarsIcon from "@mui/icons-material/Stars";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function order() {
  return (
    <>
      <HeaderCon />
      <Navbar />
      <div className="order-box-bgvw">
        <div className="container-fluid">
          <p className="id-tag-fnt">Home / My Account / My Orders</p>
          <div className="row">
            <div className="col-md-3">
              <div className="order-flt-deskview">
                <div className="rate-rev-frm shadow-sm stk-box-item">
                  <OrderFilter />
                </div>
              </div>
              <div className="order-flt-mobview">
                <FilterMobileView />
              </div>
            </div>
            <div className="col-md-9">
              <OrderSearch />
              <OrderBox />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

const OrderFilter = () => {
  return (
    <>
      <h3 className="reward-heading">Filters</h3>
      <hr />

      <form className="checkbox">
        <p className="mt-3 coin-hd-fnt-1">
          {" "}
          <b>ORDER STATUS </b>
        </p>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />{" "}
        &#160;
        <label for="vehicle1" className="label-order-fntsz">
          On the way
        </label>
        <br />
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />{" "}
        &#160;
        <label for="vehicle2" className="label-order-fntsz">
          Delivered
        </label>
        <br />
        <input type="checkbox" name="vehicle3" />
        &#160;
        <label for="vehicle3" className="label-order-fntsz">
          Cancelled
        </label>
        <br />
        <input
          type="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />{" "}
        &#160;
        <label for="vehicle3" className="label-order-fntsz">
          Returned
        </label>
        <br />
        <hr />
        <p className="mt-3 coin-hd-fnt-1">
          <b>ORDER TIME</b>
        </p>
        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />{" "}
        &#160;
        <label for="vehicle1" className="label-order-fntsz">
          Last 30 days
        </label>
        <br />
        <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />{" "}
        &#160;
        <label for="vehicle2" className="label-order-fntsz">
          2022
        </label>
        <br />
        <input
          type="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />{" "}
        &#160;
        <label for="vehicle3" className="label-order-fntsz">
          2021
        </label>
        <br />
        <input
          type="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />{" "}
        &#160;
        <label for="vehicle3" className="label-order-fntsz">
          2020
        </label>
        <br />
        <input
          type="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />{" "}
        &#160;
        <label for="vehicle3" className="label-order-fntsz">
          2019
        </label>
        <br />
        <input
          type="checkbox"
          id="vehicle3"
          name="vehicle3"
          value="Boat"
        />{" "}
        &#160;
        <label for="vehicle3" className="label-order-fntsz">
          Older
        </label>
        <br />
      </form>
    </>
  );
};

const OrderSearch = () => {
  return (
    <>
      <div className="rate-rev-frm shadow-sm ord-sch-bxvw">
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 cmt-rev-input"
            type="search"
            placeholder="Search your orders here"
            aria-label="Search"
          />
          <button className="order-search-btnvw" type="submit">
            Search
          </button>
        </form>
      </div>
    </>
  );
};
const OrderBox = () => {
  return (
    <>
      <div className="rate-rev-frm shadow-sm mt-2">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex">
              <img src={img1} alt="" className="orderimg-3" />
              <div>
                <p className="mt-2 coin-hd-fnt-1">
                  <b>Boult Audio proBass Fcharge with 40 hrs...</b>{" "}
                </p>
                <p className="coin-para-fnt-1"> Color: Black,Red</p>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <h5 className="tl-rupee-fnt">
              <CurrencyRupeeIcon className="tl-rupee-icon" />
              1,000{" "}
            </h5>
          </div>
          <div className="col-md-4">
            <p className="coin-hd-fnt-1">
              {" "}
              <b>Delivered on Aug 09</b>{" "}
            </p>
            <p className="coin-para-fnt-1" style={{ marginTop: "-10px" }}>
              Your item has been delivered
            </p>
            <h6 className="tl-rate-help-clr">
              <StarsIcon className="hprate-icon" /> Rate & Review Product
            </h6>
          </div>
          <div className="col-md-6 mt-3">
            <div className="d-flex">
              <img src={img2} alt="" className="orderimg-3" />
              <div>
                <p className="mt-2 coin-hd-fnt-1">
                  <b>Boult Audio proBass Fcharge with 40 hrs...</b>{" "}
                </p>
                <p className="coin-para-fnt-1"> Color: Black,Red</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 mt-3">
            <h5 className="tl-rupee-fnt">
              <CurrencyRupeeIcon className="tl-rupee-icon" />
              47 + <i className="bi bi-coin text-warning"></i> 2{" "}
            </h5>
          </div>
          <div className="col-md-4 mt-3">
            <p className="coin-hd-fnt-1">
              {" "}
              <b>Delivered on Aug 09</b>{" "}
            </p>
            <p className="coin-para-fnt-1" style={{ marginTop: "-10px" }}>
              Your item has been delivered
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const FilterMobileView = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <button
          onClick={handleShow}
          style={{
            backgroundColor: "#080079",
            color: "white",
            border: "solid 1px #080079",
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingTop: "7px",
            paddingBottom: "7px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "7px",
          }}
        >
          <i className="bi bi-filter"></i> Filter
        </button>
      </div>
      <div className="offcnvs-vw-index">
        <Offcanvas show={show} onHide={handleClose} style={{ zIndex: "2000" }}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="reward-heading">Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <form className="checkbox">
              <p className="mt-3 coin-hd-fnt-1">
                {" "}
                <b>ORDER STATUS </b>
              </p>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />{" "}
              &#160;
              <label for="vehicle1" className="label-order-fntsz">
                On the way
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle2"
                name="vehicle2"
                value="Car"
              />{" "}
              &#160;
              <label for="vehicle2" className="label-order-fntsz">
                Delivered
              </label>
              <br />
              <input type="checkbox" name="vehicle3" />
              &#160;
              <label for="vehicle3" className="label-order-fntsz">
                Cancelled
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />{" "}
              &#160;
              <label for="vehicle3" className="label-order-fntsz">
                Returned
              </label>
              <br />
              <hr />
              <p className="mt-3 coin-hd-fnt-1">
                <b>ORDER TIME</b>
              </p>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
              />{" "}
              &#160;
              <label for="vehicle1" className="label-order-fntsz">
                Last 30 days
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle2"
                name="vehicle2"
                value="Car"
              />{" "}
              &#160;
              <label for="vehicle2" className="label-order-fntsz">
                2022
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />{" "}
              &#160;
              <label for="vehicle3" className="label-order-fntsz">
                2021
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />{" "}
              &#160;
              <label for="vehicle3" className="label-order-fntsz">
                2020
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />{" "}
              &#160;
              <label for="vehicle3" className="label-order-fntsz">
                2019
              </label>
              <br />
              <input
                type="checkbox"
                id="vehicle3"
                name="vehicle3"
                value="Boat"
              />{" "}
              &#160;
              <label for="vehicle3" className="label-order-fntsz">
                Older
              </label>
              <br />
            </form>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};
