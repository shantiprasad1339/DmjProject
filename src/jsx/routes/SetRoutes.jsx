import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../about/About";
import Alljsx from "../alljsx/Alljsx";
import Blog from "../blog/Blog";
import Contact from "../contact/Contact";
// import SignUp from '../login/SignUp';
import BlogDetails from "../blog/BlogDetails";

import Faq from "../faq/Faq";
import TrackOrder from "../track-order/TrackOrder";
import Home from "../home/Home";
// import Login from '../login/Login';
import Favorite from "../wishlist/WishList";
import AddToCart from "../addtocart/AddToCart";

import Billing from "../paymentMode/Billing";
import "../../assets/css/update.css";
import UpdateLogin from "../login/UpdateLogin";
import CarouselBlog from "../carousel/CarouselBlog";
import Animate from "../animation/Animate";

import Login2 from "../login/Login2";
import GetIp from "../getip/GetIp";
import Loginpage from "../login/LoginPage";
import Loader from "../loader/Loader";
import Rough from "../rough/Rough";
import Navbar from "../header/Navbar";
import CheckoutPage from "../checkout/CheckoutPage";
import FilterCard from "../ProductCard/FilterCard";
import Search from "../search/Search";
// import DetailsPage from '../jewellery-page/DetailsPage'
import ProductDetails from "../jewellery-page/ProductDetail";
import Privacy from "../privacypolicy/Privacy";
import Terms from "../terms/Terms";
import Refund from "../refundpolicy/Refund";
import PaymentGateway from "../payment-gateway/PaymentGateway";
import ReviewPage from "../reviewpage/ReviewPage";
import Shipping from "../Shippingpolicy/Shipping";
// import Sidebar from '../profile/Sidebar'

import ForgetPassword from "../forget-password/ForgetPassword";
import Sidebar from "../sidebar/Sidebar";
// import Overview from '../sidebar/Overview';
// import Order from '../sidebar/Order';
// import Coupon from '../sidebar/Coupon';
// import Savedcard from '../sidebar/Savedcard';
// import Vpasaved from '../sidebar/Vpasaved';
// import Address from '../sidebar/Address';
// import Profile from '../sidebar/Profile';
// import Terms from './sidebar/Terms';
import Orderdetails from "../sidebar/Orderdetails";
// import Editprofile from '../sidebar/Editprofile';
import Invoice from '../order-page/Invoice2'
import TrackDetailsPage from "../track-order/TrackDetailsPage";
import CategoryFilter from "../category-filter/CategoryFilter";
import Payment from "../payment/payment";
import OrderDetail from "../order-page/OrderDetail";
import LogIn3 from "../LoginForAddToCart/Login3"
import Signup2 from "../LoginForAddToCart/LoginPage2"
import Popup from "../popup/PopUp"
import Thankyou from "../checkout/ThankuPage"
export default class SetRoutes extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/blogDetails" element={<BlogDetails />} />
          {/*  */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/trackOrder" element={<TrackOrder />} />
          <Route path="/" element={<Home />} />

          <Route path="/favorite" element={<Favorite />} />
          <Route path="/addToCart" element={<AddToCart />} />

          <Route path="/billing" element={<Billing />} />
          {/* <Route path='/carousel' element={<CarouselBlog />} /> */}
          <Route path="/signUp" element={<UpdateLogin />} />
          {/* <Route path='/animate' element={<Animate />} /> */}

          <Route path="/defaultlogin" element={<Login2 />} />

          <Route path="/login" element={<Loginpage />} />

          <Route path="/loader" element={<Loader />} />
          <Route path="/rough" element={<Rough />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/card" element={<FilterCard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:q" element={<Search />} />
          <Route path="/p/:slug/:skuid" element={<ProductDetails />} />
          <Route path="/privacypolicy" element={<Privacy />} />
          <Route path="/termscondition" element={<Terms />} />
          <Route path="/refundpolicy" element={<Refund />} />
          {/* <Route path='/trendingproducts' element={<TrendingProducts />} /> */}

          <Route path="/paymentgateway" element={<PaymentGateway />} />

          <Route path="/rating/:prid" element={<ReviewPage />} />
          {/* <Route path='/sidebar' element={<Sidebar/>} /> */}

          <Route path="/prodetails" element={<Home />} />

          <Route path="/profile" element={<Sidebar />} />
          <Route path="/payment/:orderId" element={<Payment />} />
          {/* <Route path="/overview" element={<Overview />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/coupon" element={<Coupon />} />
                    <Route path="/savedcard" element={<Savedcard />} />
                    <Route path="/Vpasaved" element={<Vpasaved />} />
                    <Route path="/Address" element={<Address />} />
                    <Route path="/Profile" element={<Profile />} /> */}
          <Route path="/Terms" element={<Terms />} />
          <Route path="/Orderdetails" element={<Orderdetails />} />
          {/* <Route path="/Editprofile" element={<Editprofile />} /> */}
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/trackdetails" element={<TrackDetailsPage />} />
          <Route path="/c/:query?/:page" element={<CategoryFilter />} />
          <Route path="/orderdetail/:order_Id" element={<OrderDetail />} />
          <Route path="/invoice/:invoiceid" element={<Invoice />} />
          <Route path="/shippingpolicy" element={<Shipping />} />
          <Route path="/newlogin" element={<LogIn3 />} />
          <Route path="/Signup2" element={<Signup2 />} />
          <Route path="/popup" element={<Popup />} />
          <Route path="/thankYou" element={<Thankyou />} />

        </Routes>
      </>
    );
  }
}
