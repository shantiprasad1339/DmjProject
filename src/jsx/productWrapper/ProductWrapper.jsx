import React, { useState } from 'react';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addSearch } from '../redux/dmjSlice';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import './ProductWrapper';
import Footer from "../footer/Footer";
import ImageLoader from '../loader/ImageLoader';
import { LoadImg } from '../../customhooks/LoadImg';

const url = 'https://api.diwamjewels.com/DMJ/'
const sEnd = "api/v1/products/search?query=";
const searchEnd = 'api/v1/products/type?type='

const imgUrl = 'https://images.diwamjewels.com/';

const proto = 'https://api.diwamjewels.com/DMJ'
const endPoint = '/api/v1/category';

import img1 from '../../assets/images/banner/img2.png'
import  img2 from '../../assets/images/banner/img3.png'
import img3 from '../../assets/images/banner/img1.png'



const ProductWrapper = () => {

    const [cateData, setCateData] = useState([]);


    const fetchData = async () => {
        try {
            const res = await axios.get(proto + endPoint)
          
            setCateData(res.data.data)
           
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>

            {
                cateData && cateData.map((category, index) => {
                    if(index == 0){
                        
                    return (
                        <ItemCard
                            key={index+1}
                            category={cateData[1]}
                            bgImg={index === 0 ? img1
                                : index === 1 ? img2
                                    : img3
                            }
                        />
                    )

                    }else
                     if(index == 1){
                        return (
                            <ItemCard
                            key={0}
                            category={cateData[0]}
                            bgImg={index === 0 ? img1
                                : index === 1 ? img2
                                    : img3
                            }
                        />
                        )
                    }else {
                        return (
                            <ItemCard
                            key={2}
                            category={cateData[2]}
                            bgImg={index === 0 ? img1
                                : index === 1 ? img2
                                    : img3
                            }
                        />
                        )
                    }

                })
            }
            

        </>
    )
}


export default ProductWrapper;




class ItemCard extends React.Component {


    render() {
        const { category, bgImg } = this.props;
     


        return (
            <>

                {
                    category && <div className="jewel-bg" style={{ backgroundImage: `url(${bgImg})` }}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12 text-center mt-4">
                                    <h3 className="heading-text"><b>{category.name}</b></h3>
                                    <h6 className="text-secondary text-h6" dangerouslySetInnerHTML={{ __html: category.seo_description }}></h6>
                                </div>
                            </div>

                            <div className="row">

                                <ItemImageCard
                                    category={category.name}
                                    img={imgUrl + category.image} title={category.slug} />
                                <div className="col-md-6 mt-3 itemImg">

                                    <ItemImageRowCard
                                        category={category.name}
                                        subCategory={category.subCategory === null ? [] : category.subCategory}
                                    />
                                </div>
                            </div>

                            <div className="showCardCarousel">
                                <CarouselForProduct
                                    category={category.type}
                                    item="Card"
                                    productData={category.subCategory === null ? [] : category.subCategory}
                                />
                            </div>

                            {
                                <CarouselForProduct
                                    category={category.type}
                                    productData={category.subCategory === null ? [] : category.subCategory}
                                    item='img'
                                />
                            }




                           
                        </div>
                    </div>
                }

            </>
        );
    }
}


const ItemImageCard = ({ img, title, category }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleNavigate(val) {
        navigate(`/c/${val}`);
    }


    const [isImageLoad, setIsImageLoad] = useState(false)
    return (
        <>

            <div className="col-md-6 mt-3" style={{ position: ' relative' }}>
                <div onClick={() => handleNavigate(category)}>
                    <div className="contain">
                        {img ? <img src={img} className="img-fluid arrival-img new" alt="design" /> : <ImageLoader />}

                      
                    </div>
                </div>
            </div>
        </>
    )
}

const ItemImageRowCard = ({ subCategory, category }) => {



    return (
        <>
            <div className="row">
                {

                    subCategory.length > 0 && subCategory.map((item, index) => {
                        if (index < 6) {
                            return (
                                <SmallImageCard
                                    key={item.id}
                                    img={item.image}
                                    name={item.type}
                                    category={category}
                                />
                            )
                        }
                        else {
                            return null;
                        }


                    })

                }
            </div>

        </>
    )
}

const SmallImageCard = ({ img, name, category }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleNavigate(val) {
        navigate(`/c/${val}`);
    }


    return (
        <>
            <div className="col-md-4 text-center">
                <div onClick={() => handleNavigate(category)} className="text-decoration-none home-text">
                    <div className="product-card-box">

                        <LoadImg
                            styleClass='img-fluid new-img'
                            img={imgUrl + img}
                        />
                       
                        <p className="mt-3 perfect-text">{name.length < 10 ? name : name.slice(0, 15) + '...'}</p>

                    </div>
                </div>
            </div>
        </>
    )
}















const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};


const CarouselForProduct = ({ productData, category, item }) => {


    const [subCategory1, setSubCategory] = useState([])

    async function fetchProductDetails() {
        try {
            const res = await axios.get(`${url}${searchEnd}${category}`);
           
            if (res.data.data.length > 0) {
                setSubCategory(res.data.data)
            }

        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchProductDetails()
    }, [category])
        return (
        <div className="IndicatorCarousel">
           

            <br></br>

            {item === 'img' ?
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} 
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    arrows={true}
                    customTransition="all .5s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-10-px"

                >


                    {subCategory1.length > 0 && subCategory1.map((product) => {
                        return (<CarouselCard
                            // arrows={true}
                            key={product.id}
                            img={product.images.length > 0 && product.images[0].thumbImage}
                            title={product.seo_title}
                            category={category}
                            sku={product.sku}
                            slug={product.slug}
                            id={product.id}
                            discount={product.images.length > 0 && product.images[0].productVariantEntities.length > 0 && product.images[0].productVariantEntities[0].manualPrice}
                        />
                        )
                    })}
                </Carousel>
                :
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    arrows={true}
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    keyBoardControl={true}
                    customTransition="all .5s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"

                >
                    {productData.length > 0 && productData.map((item) => {
                        return (
                            <ProductCard
                                key={item.id}
                                img={imgUrl + item.image}
                                name={item.seo_title}
                                cate={item.name}
                                category={category}

                            />
                        )
                    })}



                </Carousel>
            }


        </div>
    );
};




const CarouselCard = ({ img, title, category, discount, sku, slug,id }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleNavigate(val) {
        await dispatch(addSearch(val));
        navigate(`/p/` + slug + '/' + sku)
    }
    const wishList = (id) => {
        let existingCart = JSON.parse(localStorage.getItem("wishList")) || [];
        let userCheck = localStorage.getItem("mobileNo");
    
        if (!userCheck) {
          navigate("/login");
          return; 
        }
    
        const index = existingCart.indexOf(id);
    
        if (index !== -1) {
          existingCart.splice(index, 1);
        } else {
          existingCart.push(id);
        }
    
        localStorage.setItem("wishList", JSON.stringify(existingCart));
        window.location.reload();
      };
      const wishlistId = localStorage.getItem("wishList");

    return (
        <>
            <div onClick={() => handleNavigate(category)} style={{ cursor: "pointer" }} className="text-decoration-none"><div className="product-card-box">
                <div className='sliderCard'>
                    <div className="sliderCardImg slider-fav-iconvw">
                        <img src={imgUrl + img} className="img-fluid sliderImg" alt="Image" />
                    </div>
                    <div></div>
                    <p className="mt-3 product-font">{title.length < 20 ? title : title.slice(0, 20) + '...'}</p>
                    <p className="sale-offer">Price :{'₹ '}{discount}</p>
                    <div className='d-flex justify-content-between'>
                        <h6 className='addtocart-btn-sldr'>Add to cart <i className="bi bi-box-arrow-right"></i></h6>
                        <FavoriteBorderIcon className="hm-crd-posticon "  
                         style={{
                            background:
                              wishlistId &&
                              Array.isArray(JSON.parse(wishlistId)) &&
                              JSON.parse(wishlistId).some((id1) => id1 === id)
                                ? "red"
                                : "black",
                          }}
                          onClick={async (e) => {
                            e.stopPropagation();
                            await wishList(id);
                            window.location.reload();
                          }}
                        
                        
                        />
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

const ProductCard = ({ img, name, cate, category }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function handleNavigate(val) {
        navigate(`/c/${val}`);
    }


    return (
        <>

            <div onClick={() => handleNavigate(category)} className="text-decoration-none"><div className="product-card-box">
                <div className='sliderCard'>
                    <div className="sliderCardImg">
                        <img src={img} className="img-fluid sliderImg" alt="Image" />
                    </div>
                    <p className="mt-3 product-font text-center">{name.slice(0, 13)}</p>
                </div>
            </div>
            </div>
        </>
    )
}
