import React from 'react';
import Footer from '../footer/Footer';
import HeaderCon from '../header/HeaderCon';
import Navbar from '../header/Navbar';
import blogImg from '../../assets/images/art1.jpg';
import { CategoryList, RecentBox } from '../blog/Blog';
import recentImg from '../../assets/images/earring.jpg';
// import CarouselBlog from '../carousel/CarouselBlog';

export default class BlogDetails extends React.Component {
    render() {
        return (
            <>
                <HeaderCon />
                <Navbar />


                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p className="mt-4 detail-text">Home / Blog / Authantic and Faishonable Jewellery</p>

                            <h5 className="text-center mt-4 text-primary"><b>Authantic and Faishonable Jewellery</b></h5>

                            <p className="heading-bottom"></p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <BlogDetailCard
                            img={blogImg}
                            title=''
                            para1=' The white lavish “Platinum” is the centre of attention for all enormous reasons and is called “The King of all metals”. With being 95% pure, this precious metal has captured the hearts of all contemporary couples, and it has given its
                        owners the significance of exclusivity..'
                            para2=' The white lavish “Platinum” is the centre of attention for all enormous reasons and is called “The King of all metals”. With being 95% pure, this precious metal has captured the hearts of all contemporary couples, and it has given its
                        owners the significance of exclusivity. Though Indians are obsessed with gold and diamonds, there is a vast market for platinum jewellery lovers. Platinum, the limited metal of all, is revised into a gorgeous piece of jewellery by
                        Malabar that holds its luminosity eternal, resembling the epitome of endless love.'
                        />


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

                            </div>
                        </div>
                    </div>
                </div>
                <h5 className="text-center mt-5 text-dark"><b>Related Blog</b></h5>

                <p className="heading-bottom"></p>


                <Footer />
            </>
        )
    }
}












class BlogDetailCard extends React.Component {
    render() {
        const { img, para1, para2 } = this.props;
        return (
            <>
                <div className="col-md-9 mt-4">
                    <img src={img} alt="Blog details" className="img-fluid rounded shadow-sm img-thumbnail" />

                    <p className="para-text mt-4">
                        {para1}
                    </p>

                    <p className="para-text mt-4">
                        {para2}
                    </p>

                    <ul>
                        <li className="para-text mt-2">Buyers get the recourse to correlate designs with our comprehensive collection.</li>

                        <li className="para-text mt-2">Happy digital shopping journey.</li>

                        <li className="para-text mt-2">EMI payment</li>

                        <li className="para-text mt-2">Numerous procedures of payments.</li>

                        <li className="para-text mt-2">24×7 online assistance</li>

                        <li className="para-text mt-2">Easy return policy, and so on.</li>
                    </ul>

                    <p className="para-text mt-4">
                        Malabar gold and diamonds is one of the exceptionally trusted brands, and your safety is our priority. We have made it easier for you to approach our designs with a well-off and effortless order placing system. Every product detail is
                        defined in the description so our shoppers won’t encounter any inconvenience, right from size, gold purity, gross weight, net weight, gold certification, etc.
                    </p>

                    <p className="text-center mt-3">By MGD Blog, Nov,20,2022</p>

                </div>
            </>
        )
    }
}