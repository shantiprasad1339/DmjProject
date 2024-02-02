import React from 'react';
import './Shipping.css';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Footer from '../footer/Footer';
import { useEffect } from 'react';

const Privacy = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <>
            <HeaderCon />
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mt-5">
                        <h2><b>**Diwam Jewels - Shipping Policy **</b></h2>
                        <p className="bottom-border"></p>
                        
                        <h5 className="mt-4"><b>**1. Processing Time:**</b></h5>
                        <p className="privacy-para">Orders are processed within 48 Hours after payment is received. During peak seasons or promotions, processing times may extend slightly.</p>

                        <h5 className="mt-4"><b>**2. Shipping Rates:**</b></h5>
                        <p className="privacy-para">Shipping costs are calculated based on the weight and dimensions of the items in your order, as well as the destination. You can view the standard shipping rates at the checkout before finalizing your purchase.</p>

                        <h5 className="mt-4"><b>**3. Delivery Times:**</b></h5>
                        <p className="privacy-para">Delivery times minimum handling and packaging or maximum handling will be 24 - 48 hours. Estimated delivery times will be 8 to 14 days, and possible to track via Tracking ID. Please note that these are estimates, and actual delivery times may vary.</p>

                        <h5 className="mt-4"><b>**4. International Shipping:**</b></h5>
                        <p className="privacy-para">We currently offer international shipping to select countries. International orders may be subject to customs fees, taxes, and duties, which are the responsibility of the recipient..</p>

                        <h5 className="mt-4"><b>**5. Order Tracking:**</b></h5>
                        <p className="privacy-para">Once your order has been shipped, you will receive a confirmation email with a tracking number. You can track the status and location of your tracking ID through the delivery partner's website. Apart from the same inside your profile, you can check the delivery steps update as well.</p>

                        <h5 className="mt-4"><b>**6. Shipping Delays:**</b></h5>
                        <p className="privacy-para">While we strive to meet estimated delivery times, unforeseen circumstances such as weather, customs delays, or carrier issues may cause delays. We appreciate your patience and understanding in such situations.</p>

                        <h5 className="mt-4"><b>**7. Incomplete or Incorrect Addresses:**</b></h5>
                        <p className="privacy-para">Please ensure that your shipping address is accurate and complete before completing your purchase. We are not responsible for orders delivered to incorrect or incomplete addresses provided by the customer.</p>

                        <h5 className="mt-4"><b>**8. Lost or Stolen Packages:**</b></h5>
                        <p className="privacy-para">We are not liable for lost or stolen packages. If you suspect your package is lost or stolen, please contact the carrier to file a claim. We can provide relevant information to assist you in the process.</p>

                        <h5 className="mt-4"><b>**9. Returns Due to Shipping Issues:**</b></h5>
                        <p className="privacy-para">If your order is returned to us due to an incorrect address or is unclaimed, we will contact you to arrange a reshipment. Additional shipping fees may apply.</p>

                        <h5 className="mt-4"><b>**10. Contact Information:**</b></h5>
                        <p className="privacy-para">Diwam Jewels is an E-Comm Venture that is leading into the market and its power unit or maintained by A2G Traders Private Limited. If you have any questions or concerns regarding our shipping policy, feel free to reach out to us at contact@diwamjewels.com or WhatsApp: +91-9664073873.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Privacy;