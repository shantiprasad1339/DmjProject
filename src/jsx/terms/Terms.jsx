import React, { useEffect } from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";
import Footer from "../footer/Footer";

const Terms = () => {
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
              <b>
                **Diwamjewels Terms and Conditions**
              </b>
            </h2>
            <p className="bottom-border"></p>
            <h5 className="mt-4">
              <b>**1. Acceptance of Terms**</b>
            </h5>
            <p className="privacy-para">
              By using and accessing this e-commerce website Diwamjewels, you
              agree to be bound by these Terms and Conditions mentioned here. If
              you do not agree with these Terms, please do not use this Website.
            </p>

            <h5 className="mt-4">
              <b>**2. Definitions**</b>
            </h5>
            <ul>
              <li className="privacy-para">"Website" refers to diwamjewels.com</li>
              <li className="privacy-para">
                "User" refers to any person who accesses or uses the Website.
              </li>
              <li className="privacy-para">
                "Product" or "Products" refers to jewelry, handicrafts, blue
                pottery, and any other goods or services offered for sale on the
                Website.
              </li>
            </ul>
            <h5 className="mt-4">
              <b>**3. Registration and Account**</b>
            </h5>
            <h6>
              <b>3.1. **Account Creation**: </b>
            </h6>
            <p className="privacy-para">
              To make purchases through the Website, users may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account credentials.
            </p>

            <h6>
              <b>3.2. **Accuracy of Information**: </b>
            </h6>
            <p className="privacy-para">
              **: You must provide accurate and complete information when
              creating your account and making purchases.
            </p>
            <h5 className="mt-4">
              <b>**4. Product Listings and Descriptions**</b>
            </h5>
            <h6>
              <b>4.1. **Product Information**: </b>
            </h6>
            <p className="privacy-para">
            We make every effort to provide accurate and detailed product descriptions. However, we do not guarantee the accuracy, completeness, reliability, or error-free nature of product listings or content on the Website.
            </p>
            <h5 className="mt-4"><b>**5. Orders and Payment**</b></h5>
            <h6>
              <b>5.1. **Order Placement**:  </b>
            </h6>
            <p className="privacy-para">
            Orders placed through the Website are considered offers to purchase. We reserve the right to accept or reject any order at our discretion.
            </p>
            <h6>
              <b>5.2. **Payment**:  </b>
            </h6>
            <p className="privacy-para">
            **: Payment for orders is processed securely through All Payment Processor Available in our Website. By placing an order, you agree to pay all applicable fees and charges.
            </p>
            <h6>
              <b>5.3. **Shipping and Returns**: </b>
            </h6>
            <p className="privacy-para">
            **: Shipping and return policies are outlined separately on the Website. Users are encouraged to review these policies before making a purchase.
            </p>

            <h5 className="mt-4"><b>**6. Privacy and Data Collection**</b></h5>
            <h6><b>6.1. **Privacy**: </b></h6>
            <p className="privacy-para">The use of personal information is governed by our Privacy Policy, which can be accessed on the Website.</p>
            <h5 className="mt-4"><b>**7. Intellectual Property**</b></h5>
            <h6><b>7.1. **Copyright**:  </b></h6>
            <p className="privacy-para">All content, including images, text, graphics, logos, and product designs, on the Website is the property of Diwamjewels and is protected by copyright laws.</p>
            <h6><b>7.2. **Trademarks**: </b></h6>
            <p className="privacy-para">All trademarks, trade names, and logos used on the Website are the property of Diwamjewels.</p>
            <h5 className="mt-4"><b>**8. Disclaimers**</b>
            </h5>
            <h6><b>8.1. **Product Variations**: </b></h6>
            <p className="privacy-para">**: Due to the nature of handicraft and blue pottery products, there may be slight variations in color, size, and design. We consider these variations part of the product's uniqueness.</p>
            <h6><b>8.2. **Limitation of Liability**: </b></h6>
            <p className="privacy-para">Diwamjewels shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the Website or purchased products.</p>
            <h5 className="mt-4"><b>**9. Returns and Refunds**</b></h5>
            <p className="privacy-para">Detailed information regarding our returns and refunds policy is available on the Website.</p>
            <h5 className="mt-4"><b>**10. Governing Law and Jurisdiction**</b></h5>
            <p className="privacy-para">These Terms shall be governed by and construed in accordance with the laws of Indian constitutions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Jaipur.</p>
            <h5 className="mt-4"><b>**11. Changes to Terms**</b></h5>
            <p className="privacy-para">[Your Company Name] reserves the right to modify these Terms at any time without notice. Users are responsible for regularly reviewing these Terms for updates.</p>
            <h5 className="mt-4"><b>**12. Contact Information**</b></h5>
            <p className="privacy-para">If you have any questions or concerns about these Terms, please contact us at +91-9664073873.</p>
            <p className="privacy-para">By using the Website, you acknowledge that you have read, understood, and agreed to these Terms and Conditions. If you do not agree with any part of these Terms, please refrain from using the Website.</p>
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Terms;
