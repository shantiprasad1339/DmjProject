import React from "react";
import "./trackdetails.css";
import Navbar from "../header/Navbar";
import HeaderCon from "../header/HeaderCon";
import Footer from "../footer/Footer";
import delivery from "../../assets/images/delivery.png";


const TrackDetailsPage = () => {
  return (
    <>
      <HeaderCon />
      <Navbar />
      <div className="container-fluid mt-4 mb-4">
      <h3 className="text-center"><b>Track Your Order</b></h3>
        <div className="row">
          <div className="col-md-4 mt-3">
            <DeliveryTable />
          </div>
          <div className="col-md-8 mt-3">
            <TrackingDetails date="Wed, Sep 13" />
            <TrackingDetails date="Tue, Sep 12" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TrackDetailsPage;




const DeliveryTable = () => {
  return (
    <>
      <table className="table-box-vw">
        <tr>
          <td colspan="2" className="box-bg-color">
            <div className="d-flex">
              <img src={delivery} alt="icon" className="track-icon-sz" />
              <h4 className="del-tbl-hd">Delivery</h4>
            </div>
            <p className="tm-dt-dlry-fnt">Sep 13, 2023, 05:00 PM</p>
          </td>
        </tr>
        <ContentOfTable firstsmheading="Courier" secsmheading="Tracking Order" frstbgheading="Delivery" secbgheading="19324567890"/>
        <ContentOfTable firstsmheading="Order ID" secsmheading="Order Placed On" frstbgheading="DMJ1653127" secbgheading="Thu, Sep 7"/>
        <ContentOfTable firstsmheading="Expected Delivery" secsmheading="Last Update" frstbgheading="Thu, Sep 14" secbgheading="Sep 13, 2023, 05:00 PM"/>
      </table>
    </>
  );
};

const ContentOfTable = (props) => {
  return (
    <>
      <tr>
        <td>
          <p className="tbl-p-tagcnt">{props.firstsmheading}</p>
          <h5 className="tbl-h5-tagcnt">{props.frstbgheading}</h5>
        </td>
        <td>
          <p className="tbl-p-tagcnt">{props.secsmheading}</p>
          <h5 className="tbl-h5-tagcnt">{props.secbgheading}</h5>
        </td>
      </tr>
    </>
  );
};

const TrackingDetails = (props) => {
  return (
    <>
        <table className="table-box-vw1">
        <tr>
            <td colspan="3">
             <h5>{props.date}</h5>
            </td>
            </tr>
           
             <OrderDetailsContent time="5:00:00 PM" place="Jaipur_Punjabicolony_D (Rajasthan)" delivery="Delivered to consignee - Code Verified delivery"/>
             <OrderDetailsContent time="10:54:12 AM" place="Jaipur_Punjabicolony_D (Rajasthan)" delivery="Call placed to consignee"/>
             <OrderDetailsContent time="08:59:48 AM" place="Jaipur_Punjabicolony_D (Rajasthan)" delivery="Out for delivery"/>
             <OrderDetailsContent time="08:13:22 AM" place="Jaipur_Punjabicolony_D (Rajasthan)" delivery="Shipment Received at Facility"/>
             <OrderDetailsContent time="08:13:22 AM" place="Jaipur_Punjabicolony_D (Rajasthan)" delivery="Shipment Received at Facility"/>
        </table>
    </>
  );
};

const OrderDlryDate = (props) => {
    return (
        <>
           
        </>
    )
}
const OrderDetailsContent = (props) => {
    return (
        <>
               <tr>
                <td>{props.time}</td>
                <td>{props.place}</td>
                <td>{props.delivery}</td>
            </tr>
        </>
    )
}


