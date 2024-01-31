import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import Banner from '../Banner/Banner';
import Footer from '../footer/Footer';

export default class Faq extends React.Component {
    constructor(props) {
        super(props)
        // this.state={}

        this.componentDidMount = this.componentDidMount.bind(this)
    }


    componentDidMount() {
        window.scrollTo(0, 0)
    }


    render() {
        return (
            <>
                <HeaderCon />
                <Navbar />
                <Banner
                    title="FAQ's"
                    fullTitle="Home / FAQ's"
                />
                <div className="container">
                    <div class="row mt-5">
                        <div class="col-md-12">
                            <Item
                                dKey="0"
                                Question='**1. How can I place an order on Diwamjewels?**'
                                Answer='
                                To place an order, follow these simple steps:
                                Browse our website and select the products you wish to purchase.
                                Add the selected items to your shopping cart.
                                Review your cart and click "Checkout."
                                Provide your shipping and payment information.
                                Review your order summary and click "Place Order" to complete your purchase.
                                 '
                            />
                            <Item
                                dKey="1"
                                Question='**2. What payment methods do you accept?**'
                                Answer=' We accept a variety of payment methods, including:
                                Credit and debit cards (Visa, Mastercard, American Express, Discover)
                                PayPal
                                Other payment methods specified during the checkout process'
                            />
                            <Item
                                dKey="1"
                                Question='**3. What are your shipping options?**'
                                Answer='We offer several shipping options, including standard and expedited shipping. Shipping costs and estimated delivery times are provided during the checkout process. Please note that shipping  '
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-5"></div>
                <Footer />
            </>
        );
    }
}


class Item extends React.Component {
    render() {
        const { Question, Answer, dKey } = this.props;
        return (
            <>
                <Accordion defaultActiveKey={dKey}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className='faq-font'>{Question}</Accordion.Header>
                        <Accordion.Body className='ans-font'>
                            {Answer}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </>
        )
    }
}

export { Item };