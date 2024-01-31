import React from 'react';
import Navbar from '../header/Navbar';
import HeaderCon from '../header/HeaderCon';
import Footer from '../footer/Footer';
import blogImg from '../../assets/images/art1.jpg';
import recentImg from '../../assets/images/earring.jpg';
import { NavLink } from 'react-router-dom';
import Banner from '../Banner/Banner';

export default class Blog extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <>
                <HeaderCon />
                <Navbar />
                <Banner
                    title='Blog'
                    fullTitle='Home / Blog'
                />
                <div className="container">
                    <div className="row mt-2">
                        <div className="col-md-9">
                            <BlogCardRow />
                            <BlogCardRow />
                            <BlogCardRow />
                            {/* <div class="text-center">
                                <button class="px-5 py-2 text-white border-0 bg-primary mt-5 rounded shadow ">Load More</button>
                            </div> */}
                        </div>
                        <div className="col-md-3 mt-3">
                            <div className="cate-box">
                                <h4 className="text-center">Category</h4>
                                <CategoryList
                                    data='Handmade Jewellery with authantic and trending material'
                                />
                                <CategoryList
                                    data='Handmade Jewellery with authantic and trending material'
                                />
                                <CategoryList
                                    data='Handmade Jewellery with authantic and trending material'
                                />
                                <CategoryList
                                    data='Handmade Jewellery with authantic and trending material'
                                />
                                <CategoryList
                                    data='Handmade Jewellery with authantic and trending material'
                                />


                            </div>
                            <div className="cate-box mt-4">
                                <h4 className="text-center">Recent Posts</h4>
                                <RecentBox
                                    title='Tips & Tricks to Take Care of Your Pearls'
                                    img={recentImg}
                                    date='NOV 09, 2022'
                                />
                                <RecentBox
                                    title='Tips & Tricks to Take Care of Your Pearls'
                                    img={recentImg}
                                    date='NOV 09, 2022'
                                />
                                <RecentBox
                                    title='Tips & Tricks to Take Care of Your Pearls'
                                    img={recentImg}
                                    date='NOV 09, 2022'
                                />
                                <RecentBox
                                    title='Tips & Tricks to Take Care of Your Pearls'
                                    img={recentImg}
                                    date='NOV 09, 2022'
                                />
                                <RecentBox
                                    title='Tips & Tricks to Take Care of Your Pearls'
                                    img={recentImg}
                                    date='NOV 09, 2022'
                                />
                                <RecentBox
                                    title='Tips & Tricks to Take Care of Your Pearls'
                                    img={recentImg}
                                    date='NOV 09, 2022'
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <Footer />
            </>
        )
    }
}


class BlogCard extends React.Component {
    render() {
        const { title, date, des, img } = this.props;
        return (
            <>
                <div className="col-md-4 mt-3">
                    <div className="card rounded border-0">
                        <img src={img} className="card-img-top img-fluid rounded image-blog" alt="craft" />

                        <div className="card-body">
                            <h6 className="cont-text"><b>{title}</b></h6>

                            <p className="text-secondary">{date}</p>

                            <p className="card-text cont-text">{des}</p>

                            <NavLink to='blogdetails'><button className="view-btn px-4 py-2 mt-2">Read More</button></NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class BlogCardRow extends React.Component {
    render() {
        return (
            <>

                <div className="row">
                    <BlogCard
                        title='Home Decor Trends from the 80s We Still Love Today'
                        des='There are many brass items in different styles, colours and patterns that you will find online. They also make for cutting-edge home decor trends today.'
                        img={blogImg}
                        date='NOV 09, 2022'
                    />
                    <BlogCard
                        title='Home Decor Trends from the 80s We Still Love Today'
                        des='There are many brass items in different styles, colours and patterns that you will find online. They also make for cutting-edge home decor trends today.'
                        img={blogImg}
                        date='NOV 09, 2022'
                    />
                    <BlogCard
                        title='Home Decor Trends from the 80s We Still Love Today'
                        des='There are many brass items in different styles, colours and patterns that you will find online. They also make for cutting-edge home decor trends today.'
                        img={blogImg}
                        date='NOV 09, 2022'
                    />
                </div>
            </>
        )
    }
}


class CategoryList extends React.Component {
    render() {
        const { data } = this.props;
        return (
            <>

                <div className="d-flex text-para mt-3">
                    <i className="bi bi-chevron-right"></i>

                    <p className="blog-cate ms-1">{data}</p>
                </div>
            </>
        )
    }
}

class RecentBox extends React.Component {
    render() {
        const { img, title, date } = this.props;
        return (
            <>
                <div className="d-flex text-para mt-3">
                    <img src={img} className="img-fluid blog-img" alt="Blog post" />

                    <div>
                        <p className="blog-cate ms-2">{title}</p>

                        <p className="blog-cate ms-2 text-secondary">{date}</p>
                    </div>
                </div>
            </>
        )
    }
}

export { RecentBox, CategoryList };