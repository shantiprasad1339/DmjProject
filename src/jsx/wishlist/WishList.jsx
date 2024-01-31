import React from 'react';
import HeaderCon from '../header/HeaderCon';
import Navbar from "../header/Navbar";

import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import StarRateIcon from '@mui/icons-material/StarRate';
// import StarHalfIcon from '@mui/icons-material/StarHalf';
// import StarOutlineIcon from '@mui/icons-material/StarOutline';
import wishlistimg from '../../assets/images/wishlistimg.png';


const url = 'https://api.diwamjewels.com/DMJ/'
const endPoint = 'api/v1/products/';
const productEndPoint = 'api/v1/products';
const imgUrl = 'https://images.diwamjewels.com/';

const userToken = sessionStorage.getItem('userToken');
var wishList = JSON.parse(localStorage.getItem('wishList')) || [];



export default class WishList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            prodetails: []
        }


        this.clearItem = this.clearItem.bind(this);
        // this.deleteItem = this.deleteItem.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleWishListItems = this.handleWishListItems.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    async handleWishListItems(id) {

        try {
            const res = await axios.get(url + productEndPoint + '/' + id)
            // console.log(res.data.data)
            this.setState((prevState) => {
                const updatedProDetails = [...prevState.prodetails, res.data.data];
                return { prodetails: updatedProDetails };
            });

            // let pro = this.state.prodetails
            // console.log(updatedProDetails)
        }
        catch (err) {
            console.log(err)
        }

    }

    componentDidMount() {

        wishList = JSON.parse(localStorage.getItem('wishList')) || [];
        window.scrollTo(0, 0);
        // setProDetails([])
        const uniqueWishList = [...new Set(wishList)];
        this.setState({ prodetails: [] });
        // setAdtCart(cart)

        uniqueWishList.map((id) => this.handleWishListItems(id))
        // addProductData() 
        // console.log(this.state.prodetails)

    }


   deleteItem(id) {
    // Retrieve the current wishlist from localStorage
    let wishList = JSON.parse(localStorage.getItem('wishList')) || [];

    // Remove the item with the specified ID from the wishlist
    wishList = wishList.filter(itemId => itemId !== id);

    // Update the wishlist in localStorage
    localStorage.setItem('wishList', JSON.stringify(wishList));

    // Update the 'prodetails' state to exclude the deleted item
    this.setState((prevState) => {
        const updatedProDetails = prevState.prodetails.filter(product => product.id !== id);
        return { prodetails: updatedProDetails };
    });
}

    

    clearItem() {
        localStorage.removeItem('wishList');

        // Optionally, you can reset the 'prodetails' state to an empty array:
        this.setState({ prodetails: [] });
    }


    render() {

        const { prodetails } = this.state

        return (
            <>

                <HeaderCon />
                <Navbar />
                <div className="container mt-4">
                    <NavLink to="/" className="text-decoration-none" style={{ width: 'fit-content', display: 'inline-block' }}>
                        <h6 className="mt-4 cont-shp mb-3"><i className="bi bi-chevron-left"></i>
                            Continue shopping</h6></NavLink>
                    <div className="wish-bg">
                        <div className="d-flex justify-content-between">
                            <h5><b>Wishlist</b></h5>
                          { prodetails.length>0&& <p className="clear-text" onClick={() => this.clearItem()}>Clear items <i className="bi bi-trash3-fill"></i></p>}
                        </div>

                        <div className="row">

                            {
                                prodetails.length > 0 ? prodetails.map((item, index) => {
                                    return (
                                        <WhiteItemCard
                                            item={item}
                                            key={index}
                                            deleteItem={this.deleteItem}
                                        />
                                    )
                                })
                                    :
                                    <div>
                                        <div className='text-center mt-5'><img src={wishlistimg} alt="icon" /></div>

                                        <h4 className="mt-3 text-center"><b>Nothing here...yet</b></h4>
                                        <p className='text-center'><b>Please Add Some Products</b></p>
                                    </div>
                            }

                        </div>
                    </div>
                </div>

              
            </>
        )
    }
}


const WhiteItemCard = ({ item ,deleteItem}) => {




    const navigate = useNavigate()

    // console.log(img)
    async function handleNavigate(sku, slug) {
        // await dispatch(addSearch(val));
        navigate(`/p/` + slug + '/' + sku)
    }




    const addToCart = (productId) => {
        // Get the existing cart from localStorage or initialize an empty array if it doesn't exist
        let quantity = 2;
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if the product with the same ID already exists in the cart
        const existingProduct = existingCart.find(item => item.productId === productId);

        if (existingProduct) {
            // If the product exists, update its quantity
            existingProduct.quantity += quantity;
        } else {
            // If the product doesn't exist, add it to the cart as a new item
            const newItem = {
                productId: productId,
                quantity: quantity
            };
            existingCart.push(newItem);
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(existingCart));
        navigate('/addToCart')


    };



    return (
        <>
            <div className="col-md-3 mt-3" >
                {/* <h2>{userToken}</h2> */}
                <div className="card border-0 shadow-sm" >
                    <img src={imgUrl + item.images[0].thumbImage} className="card-img-top img-fluid wishlist-img" alt="wishlist" onClick={() => {
                handleNavigate(item.sku, item.slug)
            }} style={{ cursor: 'pointer' }}/>
                    <div className="card-body wish-body">
                        <h6 className="card-title" onClick={() => {
                handleNavigate(item.sku, item.slug)
            }} style={{ cursor: 'pointer' }}><b>{item.seo_title.replace(/"/g, '').slice(0, 25)}</b></h6>
                        <p className="pro-font"><i className="bi bi-currency-rupee"></i>
                            {item.images.length > 0 && item.images[0].productVariantEntities.length > 0 && item.images[0].productVariantEntities[0].manualPrice}
                        </p>
                        <div className='d-flex justify-content-between'>
                            <p className="off-text" onClick={() => {
                handleNavigate(item.sku, item.slug)
            }} style={{ cursor: 'pointer' }}>
                                MRP: <del><i className="bi bi-currency-rupee"></i> {item.images.length > 0 && item.images[0].productVariantEntities.length > 0 && item.images[0].productVariantEntities[0].price}</del><span> (Incl all taxes)</span>
                            </p>
                            <i className="bi bi-trash-fill text-dark" onClick={() => deleteItem(item.id)}></i>
                        </div>

                        {/* <div className="wish-star">
                            <span style={{ color: '#b79d33' }}><StarRateIcon /><StarRateIcon /><StarRateIcon /><StarHalfIcon /><StarOutlineIcon /></span> 50 Reviews
                        </div> */}
                        {/* <div className="d-flex justify-content-between mt-4">
                            <NavLink to="/addToCart"><button className="add-cart-btn" onClick={async () => {
                                await addToCart(item.id);
                                navigate("/addtocart");
                            }}>Add to cart</button></NavLink>
                            <NavLink to="/checkout"><button className="buy-now-btn" onClick={async () => {
                                await addToCart(item.id);
                                navigate("/checkout");
                            }}>Buy Now</button></NavLink>
                           
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}