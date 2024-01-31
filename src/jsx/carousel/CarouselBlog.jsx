import React from 'react';
import { NavLink } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import sliderImg1 from '../../assets/images/art1.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class CarouselBlog extends React.Component {
    render() {
        const { title } = this.props;
        return (
            <>
                <div className="container">
                    <h5 className="text-center mt-5 text-dark"><b>{title}</b></h5>

                    <p className="heading-bottom"></p>
                    <Carousel
                        className="slider my-4 wrapper-slider"
                        autoPlay={true}
                        width='100%'
                        showStatus={false}
                        showArrows={false}
                        infiniteLoop={true}
                        showThumbs={false}
                        arrows={true}
                    >

                        <CarouselCard
                            ariaLabel='card-1'
                            className='slideCard'
                            img={sliderImg1}
                            title='Authantic Fashionable Jewellery'
                            des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, 
                              saepe quia quod pariatur fugit dolorem numquam quis reiciendis eligendi ab.'
                        />


                        <CarouselCard
                            className='slideCard'
                            img={sliderImg1}
                            title='Authantic Fashionable Jewellery'
                            des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, 
                              saepe quia quod pariatur fugit dolorem numquam quis reiciendis eligendi ab.'
                        />



                        <CarouselCard
                            img={sliderImg1}
                            className='slideCard'
                            title='Authantic Fashionable Jewellery'
                            des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, 
                              saepe quia quod pariatur fugit dolorem numquam quis reiciendis eligendi ab.'
                        />


                        <CarouselCard
                            className='slideCard'
                            img={sliderImg1}
                            title='Authantic Fashionable Jewellery'
                            des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, 
                              saepe quia quod pariatur fugit dolorem numquam quis reiciendis eligendi ab.'
                        />


                        <CarouselCard
                            className='slideCard'
                            img={sliderImg1}
                            title='Authantic Fashionable Jewellery'
                            des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, 
                              saepe quia quod pariatur fugit dolorem numquam quis reiciendis eligendi ab.'
                        />



                        <CarouselCard
                            img={sliderImg1}
                            title='Authantic Fashionable Jewellery'
                            des='Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, 
                              saepe quia quod pariatur fugit dolorem numquam quis reiciendis eligendi ab.'
                        />


                    </Carousel>
                </div>
            </>
        )
    }
}


class CarouselCard extends React.Component {
    render() {
        const { img, title, des } = this.props;
        return (
            <>
                <div className="carouselCard">
                    <NavLink to='/blogdetails' className="text-decoration-none text-dark">
                        <div className="card slide-card">
                            <img src={img} className="card-img-top img-fluid slider-card-img" alt="slider" />

                            <div className="card-body">
                                <p><b>{title}</b></p>

                                <p className="jewel-text1">{des}</p>

                                <div className="text-center">
                                    <NavLink to='/blogdetails'>
                                        <h6 className="text-primary">Read More <i className="bi bi-arrow-right"></i></h6>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </>
        )
    }
}

export { CarouselCard }