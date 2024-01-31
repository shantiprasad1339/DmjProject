import React, { useReducer } from "react";
import HeaderCon from "../header/HeaderCon";
import Navbar from "../header/Navbar";

import Footer from "../footer/Footer";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import { updateAmount } from "../redux/dmjSlice";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import cartimg from "../../assets/images/addtocartimg.png";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/products/";
const productEndPoint = "api/v1/products/";
const imgUrl = "https://images.diwamjewels.com/";

var cart = JSON.parse(localStorage.getItem("cart")) || [];

const AddToCart = () => {
  const [proDetails, setProDetails] = useState([]);
  const [adtCart, setAdtCart] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [price, setPrice] = useState("");
  const [dis, setDis] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [proQuantity, setQuantity] = useState([]);
  const [newProductDetails, setNewProductDetails] = useState([])




  async function fetchProductData(id) {
    
    try {
      const res = await axios.get(url + productEndPoint + id);
      const product = res.data.data;
      setProDetails((prevDetails) => [...prevDetails, product]);
    } catch (err) {
      console.log(err);
    }
  }

 
  const updateCart = (productId, quantity) => {
    const updatedCart = [...adtCart];
  
    const index = updatedCart.findIndex((item) => item.productId === productId);
  
    if (index !== -1) {
      updatedCart[index].quantity = quantity;
    } else {
      updatedCart.push({ productId, quantity });
    }
  
   
  
    setAdtCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsUpdate(!isUpdate);
  };
  // 45965+65+9
  

  useEffect(() => {
    // Proceed with processing cart items only when product details are available
    if (proDetails.length > 0) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const selectedProducts = cart.map(cartItem => {
        const productDetail = proDetails.find(detail => detail.id === cartItem.productId);
        return {
          name: productDetail?.seo_title || 'Unknown',
          quantity: cartItem.quantity || 0,
          image: productDetail?.images[0].thumbImage || '',
          price: productDetail?.images[0].productVariantEntities[0].price || 0,
          amount: productDetail?.images[0].productVariantEntities[0].manualPrice ?? 0,
          discount: productDetail?.images[0].productVariantEntities[0].discount || 0,
          productVariantId: productDetail?.images[0].productVariantEntities[0].id || 0,
          totalPriceOfOne:productDetail?.images[0].productVariantEntities[0].manualPrice * (cartItem.quantity-1) || 0
        };
      });

      setNewProductDetails(selectedProducts);
    }
  }, [proDetails]);










  // 324654654
 

useEffect(() => {
  window.scrollTo(0, 0);
  setQuantity("");
  setProDetails([]);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setAdtCart(cart);

  const quant = [];
  cart.forEach(({ productId, quantity }) => {
    fetchProductData(productId);
    quant.push(quantity);
  });

  // console.log("proDetails:", proDetails);
  // console.log("adtCart:", adtCart);
  // console.log("proQuantity:", proQuantity);

  setQuantity(quant);
}, []);


  return (
    <>
      <HeaderCon />
      <Navbar />

      <Helmet>
        <meta charSet="utf-8" />
        <title>Add To Cart</title>
        <meta name="description" content="DmJ Add to cart" />
        <meta name="keywords" content="DmJ Add to cart" />
      </Helmet>
      <div className="container-fluid">
        <NavLink to="/" className="text-decoration-none">
          <h6 className="mt-4 cont-shp">
            <i className="bi bi-chevron-left"></i>
            Continue shopping
          </h6>
        </NavLink>

        {proDetails.length > 0 ? (

          <div className="row cart-row-dply">
            <div className="col-md-8">
              <div className="cart-bg">
                <h6 className="pro-font">PRODUCT</h6>
                <div className="d-flex">
                  <h6 className="pro-font">QUANTITY</h6>
                  <h6 className="pro-font ms-5">PRICE</h6>
                  <h6 className="pro-font ms-5">REMOVE</h6>
                </div>
              </div>
              {proDetails.map((item, index) => {
               
                return (
                  <ProductDetails
                    setPrice={setPrice}
                    price={price}
                    dis={dis}
                    setDis={setDis}
                    totalAmount={totalPrice}
                    setTotalPrice={setTotalPrice}
                    product={item}
                    removeCart={updateCart}
                    key={index}
                    quantity={proQuantity[index]}
                    totalPrice={
                      item.images.length > 0 &&
                      item.images[0].productVariantEntities.length > 0 &&
                      item.images[0].productVariantEntities[0].price
                    }
                  />


                );
              })}
            </div>
            <div className="col-md-4">
              <OrderDetails
                item={newProductDetails}
                setPrice={setPrice}
                price={price}
                dis={dis}
                setDis={setDis}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
              />
            </div>
          </div>

        ) : (
          <div>
            <div className="text-center mt-5">
              <img src={cartimg} alt="icon" />
            </div>

            <h4 className="mt-3 text-center">
              <b>Nothing here...yet</b>
            </h4>
            <p className="text-center">
              <b>Please Add Some Products</b>
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};










const ProductDetails = ({
  product,
  removeCart,
  quantity,
  setTotalPrice,
  totalAmount,
  setDis,
  dis,
  price,
  setPrice,
}) => {
  return (
    <>
      <Products
        product={product}
        removeItem={removeCart}
        quantity={quantity}
        setPrice={setPrice}
        price={price}
        dis={dis}
        setDis={setDis}
        totalAmount={totalAmount}
        setTotalPrice={setTotalPrice}
      />
    </>
  );
};












const Products = ({ product, quantity }) => {
  const [itemQuan, setItemQuan] = useState(2);
  const [productName, setProductName] = useState("Sample");
  const [price, setPrice] = useState(3);
  const [totalPrice, setTotalPrice] = useState(0);
  const [thumb_img, setThumbImg] = useState();
  const [itemId, setItemId] = useState(0);

  const dispatch = useDispatch();
// console.log("product",product);
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedCart = cart.map((item)=>{
      if(product.id == item.productId){
        setItemQuan(item.quantity);
        setProductName(product.seo_title);
          setPrice(
    
            product.images.length > 0 &&
              product.images[0].productVariantEntities.length > 0 &&
              product.images[0].productVariantEntities[0].price
     );
      setTotalPrice(
    
      product.images[0].productVariantEntities[0].price * (item.quantity - 1)
    );
     setThumbImg(imgUrl + product.images[0].thumbImage);
     setItemId(product.id);
      }
    })
    // console.log("updatedCart",updatedCart);
    // console.log("cart2",cart );



    // setItemQuan(quantity);
    // setItemQuan(quantity);
    // setProductName(product.seo_title);
    // setPrice(
    //   product.images.length > 0 &&
    //   product.images[0].productVariantEntities.length > 0 &&
    //   product.images[0].productVariantEntities[0].price
    // );
    // setTotalPrice(
    //   product.images.length > 0 &&
    //   product.images[0].productVariantEntities.length > 0 &&
    //   product.images[0].productVariantEntities[0].price * (quantity - 1)
    // );
    // setThumbImg(imgUrl + product.images[0].thumbImage);
    // setItemId(product.id);
  }, [product, quantity]);

  async function minQuan() {
    // let itemQuan = this.state.itemQuan;

    // Retrieve the current cart data from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find the index of the product in the cart
    const index = cart.findIndex(
      (cartItem) => cartItem.productId === product.id
    );

    if (index !== -1) {
      // Update the quantity of the product in the cart
      cart[index].quantity = itemQuan - 1;

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(updateAmount(cart));
    }

    // let totalPrice = totalPrice;
    let tempPrice = price;
    if (itemQuan > 2) {
      setItemQuan(itemQuan - 1);
      setTotalPrice(totalPrice - tempPrice);
    }
  }

  function addQuan() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    // console.log(product)
    let itemQuant = itemQuan;
    // console.log(itemQuant)
    const index = cart.findIndex(
      (cartItem) => cartItem.productId === product.id
    );

    if (index !== -1) {
      // Update the quantity of the product in the cart
      cart[index].quantity = itemQuant + 1;

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(updateAmount(cart));
    }

    // let totalPrice = totalPrice;
    let tempPrice = parseInt(price);
    if (itemQuan < 6) {
      setTotalPrice(totalPrice + tempPrice);
      setItemQuan(itemQuan + 1);
    }
    // Find the index of the product in the cart

    // let cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  const removeItem = (itemId) => {
    // Retrieve the cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Use the filter method to create a new cart without the item with the specified ID
    const updatedCart = cart.filter((item) => item.productId !== itemId);

    // Update the cart in localStorage with the updated array
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };

  return (
    <>
      <div className="cart-display mt-3">
        <div className="d-flex">
          <img src={thumb_img} alt="Cart" className="img-fluid cart-img" />
          <div className="add-product-namebx">
            <p className="ms-2 cart-font">
              {/* {productName.length < 25
                ? productName
                : productName.slice(0, 25) + "..."} */}

                {productName}
            </p>
            <p className="ms-2 cart-font">
              Availablity : <span className="text-primary">In Stock</span>
            </p>
          </div>
        </div>

        <div className="d-flex">
          <div className="num-block skin-1 mt-2">
            <div className="num-in">
              
            <span className={`minus dis${itemQuan === 2 ? ' disabled' : ''}`} onClick={itemQuan === 2 ? null : minQuan}></span>
<input
  type="text"
  className="in-num"
  value={itemQuan - 1}
  readOnly=""
/>
<span className={`plus${itemQuan === 6 ? ' disabled' : ''}`} onClick={itemQuan === 6 ? null : addQuan}></span>

            </div>
          </div>
          <h6 className="pro-font mt-3 cart-qty">
            <i className="bi bi-currency-rupee"></i>
            {totalPrice}
          </h6>
          <h6
            className="pro-font mt-3 cart-qty"
            onClick={() => removeItem(itemId)}
          >
            <i className="bi bi-trash-fill fs-5 text-danger"></i>
          </h6>
        </div>
      </div>
      <hr />
    </>
  );
};







const OrderDetails = ({ item, price }) => {
  const [totalPrice, setTotal] = useState(0);
  const [disTotal, setDisTotal] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(150);

  const dispatch = useDispatch();
  const cartRe = useSelector((state) => state.product.amount.payload);

  var cart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    // handleAllPrice(item)
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    const userId = localStorage.getItem("userId");
    // console.log(cartRe)
    if (cartRe === undefined) {
      dispatch(updateAmount(cart));
    }

    if (userId !== undefined && userId) {
      updateAddToCart();
    }

    handleAllPrice(item);
  }, [item, cart, cartRe]);

  async function updateAddToCart() {
    // console.log("fired");
    // try{
    //     const res = axios.post(url)
    // }
  }

  async function handleAllPrice(item1) {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    const quantitiesArray = [];
console.log(item);
    cart.forEach((cartItem) => {
      quantitiesArray.push(cartItem.quantity || 1); 
    });

    let total = 0;
    let discountTotal = 0;

    // console.log(quantitiesArray[0])
    item1.forEach((item, index) => {
     
        const productPrice = parseInt(
          item.price
        );
        const productManualPrice = parseInt(
          item.amount
        );
        // Get the quantity from the item, default to 1 if not available
        total += productPrice * (quantitiesArray[index] - 1);
        discountTotal += productManualPrice * (quantitiesArray[index] - 1);
      
    });

    setTotal(total);
    localStorage.setItem("total", total)
    setDisTotal(discountTotal);
    localStorage.setItem("discounttotal", discountTotal)
  }

  return (
    <>
      <div className="stk-box-item">
        <div className="order-dtl">
          <h6 className="pro-font">Order Details</h6>
          <hr />
          <div className="d-flex justify-content-between mt-3">
            <p className="sub-ttl">Subtotal</p>
            <p className="sub-ttl">
              <i className="bi bi-currency-rupee"></i>
              {totalPrice > 0 && totalPrice}
            </p>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <p className="sub-ttl">Discount</p>
            <p className="sub-ttl">
              <i className="bi bi-currency-rupee"></i>
              {totalPrice - disTotal}
            </p>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <p className="sub-ttl">Delivery Charges</p>
            <p className="sub-ttl">
              <i className="bi bi-currency-rupee">{deliveryCharges}</i>
            </p>
          </div>
          <hr />
          <div className="d-flex justify-content-between mt-3">
            <p>
              <b>Total Amount</b>
            </p>
            <p>
              <b>
                <i className="bi bi-currency-rupee"></i>
                {disTotal + deliveryCharges}
              </b>
            </p>
          </div>
          <hr />
          <p className="save-dtl">
            You will save <i className="bi bi-currency-rupee"></i>
            {totalPrice - disTotal} on this order.
          </p>
        </div>

        <div className="text-end mt-3 mb-3">
          <NavLink to="/checkout">
            <button className="trend-cart-btn">Place Order</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
