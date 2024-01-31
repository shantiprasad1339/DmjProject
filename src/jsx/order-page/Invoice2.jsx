import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "./invoice2.css";
import qrcode from "./qrcode.png";
import sign from "./sign.png";
import amazon from "./amaz.png";

const Invoice = React.forwardRef((props, ref) => {
  const [invoiceDetails, setInvoice] = useState(null);
  const [addressModel, setAddressModel] = useState(null);
  const [date, setDate] = useState(null);
  const componentRef = ref || useRef();
  const { invoiceid } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, []);
  const url = "https://api.diwamjewels.com/DMJ/";
  function fetchProduct() {
    axios.get(url + "api/v1/order/" + invoiceid).then((res) => {
      console.log("InvoiceDetails", res.data.data);
      setInvoice(res.data.data);
    });
    axios
      .get(url + "api/v1/orderdetails/getOrders/" + invoiceid)
      .then((res) => {
        console.log('productDetails',res.data.data);
        setAddressModel(res.data.data);
      });
  }

  const generatePdf = () => {
    const input = document.getElementById("invoice-container");
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
      pdf.save("invoice.pdf");
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: generatePdf,
  });
  // setTimeout(()=>{
  //   handlePrint()
  // },2000)
  return (
    <>
      <div className="container" ref={componentRef}>
        <div className="invc-main-box">
          <div className="row">
            <div className="col-md-9 mt-2">
           {invoiceDetails && invoiceDetails.created_at ? <TaxInfo date={invoiceDetails.created_at} orderNo={invoiceDetails.orderNumber} invoiceNumber={invoiceDetails.invoiceNumber}/> :'Loading Date ....'}
              <div className="bdr-btmline"></div>
              <ClientInfoAddress invoiceAddress={invoiceDetails} />
            </div>
            <div className="col-md-3 mt-2">
              <div className="qr-code-box">
                <img src={qrcode} alt="QR Code" className="qr-code-img" />
              </div>
            </div>
            <div className="col-md-3">
<button className="btn btn-primary" onClick={handlePrint}>Save</button>
</div>
            <div className="col-md-12">
              <ClientInfoTable addressModel={addressModel} />

            </div>

            
            <div className="col-md-4">
                <p className="invc-dtl">
                  Seller Registered Address: A2G TRADERS PRIVATE LIMITED,
                  <br />
                  TARA NAGAR, 470, JAISINGHPURA KHOR, Jaipur, Jaipur, AMER -
                  302027.
                </p>
                <p
                  className="val-num-fnt main-dtl-vw-invc"
                  style={{ textAlign: "start" }}
                >
                  <b>Declaration</b>
                  <br /> The goods sold are intended for end user consumption
                  and not for resale.{" "}
                </p>
              </div>

              <div className="col-md-4 text-center">
              <div className="">
        
          <div className="amz-logo-box m-auto">
            <img src='https://diwamjewels.com/dmjicon.png' alt="flipkart" className="qr-code-img mt-2" />
          </div>
        </div>
              </div>
              <div className="col-md-4 mt-2">
          <div className="sign-img-box">
            <img src={sign} alt="signature" className="qr-code-img" />
          </div>
          <p className="val-num-fnt" style={{ textAlign: "start" }}>
            Ordered Through
          </p>
          <h6  style={{marginTop:'-15px'}}>
            <b>A2G TRADERS PRIVATE LIMITED</b>
          </h6>
          <p className="val-num-fnt" style={{ marginTop: "-7px" }}>
            Authorized Signature
          </p>
        </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Invoice;

const TaxInfo = ({date,orderNo,invoiceDetails}) => {
  const originalDate = new Date(date);

  // Apply the UTC offset for IST (UTC+5:30)
  originalDate.setUTCHours(originalDate.getUTCHours() + 5);
  originalDate.setUTCMinutes(originalDate.getUTCMinutes() + 30);
  
  const formattedDate = originalDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
   
   
  });
  // console.log(formattedDate);
  return (
    <>
      <div className="tax-info-box">
        <h5 className="tax-heading">Tax Invoice</h5>
        <div>
          <p className="invc-dtl">
            Order No:{" "}
            <span style={{ color: "black", fontSize: "800" }}>
             {orderNo}
            </span>
          </p>
          <p className="invc-dtl main-dtl-vw-invc">
            Order Date: {formattedDate}
          </p>
        </div>
        <div>
          <p className="invc-dtl">
            Invoice No:{" "}
            <span style={{ color: "black", fontSize: "800" }}>
              {invoiceDetails }
            </span>
          </p>
          <p className="invc-dtl main-dtl-vw-invc">
            Invoice Date: {formattedDate}
          </p>
        </div>
        <div>
          <p className="invc-dtl">GSTIN: 08AAVCA7886Q1ZB</p>
          <p className="invc-dtl main-dtl-vw-invc">PAN: AAVCA7886Q</p>
        </div>
      </div>
    </>
  );
};

const ClientInfoAddress = ({ invoiceAddress }) => {
  return (
    <>
    {invoiceAddress && invoiceAddress ? <div className="add-main-div">
        <div className="mt-1">
          <h6 className="clt-info-hdg">Sold By</h6>
          <p className="invc-dtl">
            A2G TRADERS PRIVATE LIMITED, 101 Ground Floor, Gurukripa Enclave,
            Near Old Ramgarh Mod Bus Stand , IndusInd Bank , JAIPUR - 302002
          </p>
          <p className="invc-dtl">GST: 08AAVCA7886Q1Z8</p>
        </div>

        <div className="mt-1">
          <h6 className="clt-info-hdg">Shipping Address</h6>
          <p className="invc-dtl">
            {invoiceAddress.addressModel.name},{invoiceAddress.addressModel.area}, {invoiceAddress.addressModel.city},{" "}
            {invoiceAddress.addressModel.state},
          </p>
          {/* <p className="invc-dtl">Kasli House, Narayan Puri, Durga Vihar-
D, Shanti Path, Jhotwara, Jaipur, Rajasth
an,
Jaipur - 302012, IN-RJ</p> */}
        </div>

        <div className="mt-1 mx-2">
          <h6 className="clt-info-hdg">Billing Address</h6>
          <p className="invc-dtl">
          {invoiceAddress.addressModel.name},{invoiceAddress.addressModel.area}, {invoiceAddress.addressModel.city},{" "}
            {invoiceAddress.addressModel.state},
           
          </p>
          {/* <p className="invc-dtl">Kasli House, Narayan Puri, Durga Vihar-D, Shanti Path,
Jhotwara, Jaipur, Rajasthan,
Jaipur - 302012, IN-RJ </p> */}
        </div>
      </div> :'loading..'}
      
    </>
  );
};

const ClientInfoTable = ({ addressModel }) => {
  // console.log("product", addressModel);
  return (
    <>
    <div className="table-responsive">
  <>
    {addressModel ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Qty</th>
            <th scope="col">Gross Amount</th>
            <th scope="col">Discount</th>
            <th scope="col">Taxable Value</th>
            <th scope="col">CGST</th>
            <th scope="col">SGST/UTGST</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {addressModel.map((item, index) => (
            <tr className="tbl-invc-data" key={index}>
              <td>
                {item.name}. |{item.sku} |
              </td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.discount}%</td>
              <td>{item.amount}</td>
              <td>00.0</td>
              <td>00.0</td>
              <td>{item.amount}</td>
            </tr>
          ))}

          <tr className="tbl-invc-data">
            <td></td>
            <td>
              <b className="fontSmall">Shipping Charges</b>
            </td>
            <td>150</td>
            <td>0.00</td>
            <td>0</td>
            <td>0.00</td>
            <td>0.00</td>
            <td>150.00</td>
          </tr>

          <tr>
            <td className="qty-ttl-num">
              <b>TOTAL QTY: {addressModel.reduce((acc, item) => acc + item.quantity, 0)}</b>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan={2} className="qty-ttl-num">
              <b className="fontSmall2">TOTAL PRICE: {addressModel.reduce((acc, item) => acc + item.amount, 0) + 150}</b>
              <p className="val-num-fnt fontSmall2">All values are in INR</p>
            </td>
          </tr>
        </tbody>
      </table>
    ) : "loading.."}
  </>
</div>

    </>
  );
};

const OwnerSign = () => {
  return (
    <>

    </>
  );
};
