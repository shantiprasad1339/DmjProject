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
import img2 from '../../assets/images/banner/img3.png'
import img3 from '../../assets/images/banner/img1.png'



const ProductWrapper = () => {

    const [cateData, setCateData] = useState([]);


    const fetchData = async () => {
        try {
            const res = await axios.get(proto + endPoint)
            // console.log(res.data.data)
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
                    // console.log(category)

                    return (
                        <ItemCard
                            key={index}
                            category={category}
                            bgImg={index === 0 ? img1
                                : index === 1 ? img2
                                    : img3
                            }
                        />
                    )

                })
            }
            {/* // }{ //     cateData.length > 0 && <Footer />
            // } */}

        </>
    )
}


export default ProductWrapper;




class ItemCard extends React.Component {


    render() {
        const { category, bgImg } = this.props;
        // console.log(category)


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




                            {/* <div className="pb-5"></div> */}
                            {/* <div className="text-center">
                            <NavLink href="/carpet">
                                <button className="px-4 py-2 view-btn mt-3">View More</button>
                            </NavLink>
                        </div> */}
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

    // console.log(img)
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

                        <div className="text-block text-center">
                            {/* <h6 className="mt-2 perfect-text-sz"><b>{title}</b></h6> */}
                        </div>
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

    // console.log(img)
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
                        {/* <p className="sale-offer">Up to 50%</p> */}

                    </div>
                </div>
            </div>
        </>
    )
}









// carousel for product 





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

    // console.log(category)

    const [subCategory1, setSubCategory] = useState([])

    async function fetchProductDetails() {
        try {
            const res = await axios.get(`${url}${searchEnd}${category}`);
            // console.log(`${url}${searchEnd}${category}`)
            // console.log(res.data.data)
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
    // console.log(productData)



    return (
        <div className="IndicatorCarousel">
            {/* <div className="IndicatorCarouselText">
            Select your preferred stock indicators
        </div> */}

            <br></br>

            {item === 'img' ?
                // If item is 'img', render a CarouselCard for each image
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    arrows={true}
                    customTransition="all .5s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    // removeArrowOnDeviceType={["desktop", "tablet"]}
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
                    // removeArrowOnDeviceType={["desktop", "tablet"]}
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




const CarouselCard = ({ img, title, category, discount, sku, slug }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log(img)
    async function handleNavigate(val) {
        await dispatch(addSearch(val));
        navigate(`/p/` + slug + '/' + sku)
    }
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
                    <div><h6 className='addtocart-btn-sldr'>Add to cart <i className="bi bi-box-arrow-right"></i></h6></div>
                </div>
            </div>
            </div>
        </>
    )
}

const ProductCard = ({ img, name, cate, category }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log(img)
    async function handleNavigate(val) {
        // await dispatch(addSearch(val));
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
                    {/* <p className="sale-offer text-center">Up to 50%</p> */}
                </div>
            </div>
            </div>
        </>
    )
}
