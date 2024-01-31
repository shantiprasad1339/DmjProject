import React from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";
import { useEffect } from "react";

const Refund = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HeaderCon />
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <h2>
              <b>Diwamjewels Cancellation/Refund Policy</b>
            </h2>

            <p className="bottom-border"></p>
            <p className="privacy-para">
              At Diwam Jewels, we are committed to providing you with the most
              enjoyable shopping experience possible for artificial jewellery,
              handicrafts, and blue pottery. We consider that there may be times
              when you want to return an item or get a refund. Please read the
              following information regarding refunds and cancellations in
              detail.
            </p>
            <h5 className="mt-4">
              <b> Order Cancellation </b>
            </h5>
            <p className="privacy-para">
              You have the opportunity to cancel your order anytime within the
              first twenty-four hours after placing it if you wish to do so. If
              you need to cancel an order, please contact DMJ’s customer support
              team. We shall do everything in our power to fulfil the request
              you have made. Diwam Jewels will not be able to cancel the order,
              however, if it has already been processed and dispatched.
            </p>

            <h5>
              <b> Refund Eligibility: </b>
            </h5>
            <p className="privacy-para">
              In the following circumstances, refunds may be claimed.
              <ul>
                <li>
                  If the order is cancelled before the end of the allotted
                  amount of time.
                </li>
                <li>
                  If the product you received is broken or defective in some
                  other way.
                </li>
                <li>
                  If the item you receive is not following the description of
                  the product on the website.
                </li>
                <li>
                  If during the delivery, the customer opens the product in the
                  presence of the delivery person and discovers damage, the
                  customer can immediately return it to the delivery person.
                </li>
                <li>
                  If the customer discovers damage after receiving the order and
                  opens it within 3 days of delivery, the customer must initiate
                  the refund process.
                </li>
              </ul>
            </p>

            <h5>
              <b> Refund Process : </b>
            </h5>

            <p className="privacy-para">
               If your order is qualified for a refund, DMJ will start the
              process within 3 working business days after we receive and
              inspect the returned product. Your refund will be processed
              through the same payment option used for the initial purchase or
              cancellation. However, depending on your chosen method of payment,
              the refund may take some time to show up in your account.
              <br />
              To return a product for a refund you must contact our customer
              care team within 3 days of receiving it. Send the goods back to us
              along with all of the included things and documentation, as well
              as the original packing it came in.
            </p>
            <h5 className="mt-4">
              <b> Non Refundable Items </b>
            </h5>
            {/* <h6>
              <b>To initiate a return, please follow these steps:</b>
            </h6> */}
            <p className="privacy-para">
              Certain items, such as those that have been customised,
              modified, or changed in some way, may not be eligible for a refund
              unless they are damaged or defective when they are received. If
              the customer is placing the refund after 3 days of receiving the
              order, then they cannot get a refund under any condition.
            </p>
            <h5>
              <b>Refund for Sale Items : </b>
            </h5>
            <p className="privacy-para">
               If the items were purchased during the sale or promo period
              there will be no refund provided at the price at which they were
              organically sold.
            </p>
            <h5>
              <b> Modification in the Policy : </b>
            </h5>
            <p className="privacy-para">
              We may implement updates and modifications to our website,
              including changes to the return and refund policy. We encourage
              you to regularly review the latest version of the DMJ refund and
              return policy whenever you use our website. This ensures that you
              stay aware of any revisions or adjustments made over time.
            </p>
            <h5>
              <b> Contact us : </b>
            </h5>
            <p className="privacy-para">
              If you want to exchange the goods for a different size or version,
              please contact our customer care support team. We will walk you
              through the process of making a refund. If you have any questions
              or concerns about our cancellation or refund policy, please feel
              free to contact our costomer care teams.
            </p>
            {/* <h5 className="mt-4">
              <b>**3. Refunds**</b>
            </h5>
            <h6>
              <b>3.1. **Refund Process**: </b>
            </h6>
            <p className="privacy-para">
              **: Once we receive and inspect the returned item(s), we will
              notify you of the status of your refund. If the return is
              approved, we will initiate a refund to your original payment
              method. Please allow 7 to 10 days for the refund to appear in your
              account, depending on your payment provider.
            </p>
            <h6>
              <b>3.2. **Return Shipping Costs**: </b>
            </h6>
            <p className="privacy-para">
              Customers are responsible for return shipping costs, except in
              cases where the return is due to a product defect or an error on
              our part.
            </p>
            <h5 className="mt-4">
              <b>**4. Exchanges**</b>
            </h5>
            <p className="privacy-para">
              Unfortunately, we do not offer exchanges at this time. If you wish
              to exchange an item, please follow the return process outlined
              above and place a new order for the desired item.
            </p>
            <h5 className="mt-4">
              <b>**5. Damaged or Defective Items**</b>
            </h5>
            <p className="privacy-para">
              If you receive a damaged or defective item, please contact us
              immediately. We will work with you to resolve the issue promptly,
              which may include providing a replacement, repair, or refund.
            </p>
            <h5 className="mt-4">
              <b>**6. Contact Us**</b>
            </h5>
            <p className="privacy-para">
              If you have any questions or concerns about our return and refund
              policy, please contact our customer support team at
              info@diwamjewels.com
            </p> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Refund;
