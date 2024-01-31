import React, { useState, useEffect } from "react";
import "./catergory-filter.css";
import Navbar from "../header/Navbar";
import HeaderCon from "../header/HeaderCon";
import Footer from "../footer/Footer";
import banner from "../../assets/images/cate-img.png";
import img from "../../assets/images/earring.jpg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FilterCard from "../ProductCard/FilterCard";
import ProductFilter from "../ProductCard/ProductFilter1";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import axios from "axios";
import { ProductItemCard } from "../ProductCard/FilterCard";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

const proto = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://images.diwamjewels.com/";
const endPoint = "api/v1/products/search?query=";

const CategoryFilter = () => {
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryDes, setCategoryDes] = useState();
  const params= useParams();
  const query  = params.page
console.log("useParams",params.page);
  const fetchData = () => {
    setLoading(true);
    const apiUrl = `https://api.diwamjewels.com/DMJ/api/v1/category/type?type=${query}`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.data) {
          setCategoryDes(response.data.data.categoryDescription);
          const categoryDescription = response.data.data.categoryDescription;
          if (categoryDescription !== null) {
            const categoryDescriptionWithoutHtml = categoryDescription.replace(
              /<[^>]*>/g,
              ""
            );
            setData(categoryDescription);
          } else {
            setData("Category description not available");
          }
        } else {
          setData("response.data.data.categoryDescription");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchTxt]);

  return (
    <>
      <HeaderCon />
      <Navbar />

      <div className="mt-4">
        <ProductFilter />
      </div>
      <div className="mb-5">
        <FilterCategoryCard query={query} />
      </div>

      <div className="filter-ftr-content">
        <ProductContentFilter categoryDes={categoryDes} />
      </div>
      <Footer />
    </>
  );
};
export default CategoryFilter;

const CategoryBanner = () => {
  return (
    <>
      <div className="cate-banner-box">
        <img src={banner} alt="banner" className="cate-banner-img" />
      </div>
    </>
  );
};

const CategoryComponent = (props) => {
  return (
    <>
      <div className="column-grid-vw text-center">
        <div className="comp-box-scale">
          <div className="cate-img-boxvw">
            <img
              src={props.image}
              alt="categoryImg"
              className="img-vwfr-category"
            />
          </div>
          <p className="comp-para-fnt">
            {props.category} <ArrowRightAltIcon />
          </p>
        </div>
      </div>
    </>
  );
};

const FilterCategoryCard = ({ query }) => {
  console.log("query",query);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState("0");
  const [element, setElement] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoad, setLoad] = useState(false);


  

  const fetData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${proto}${endPoint}${query}&pageSize=${pageSize}`);
      // console.log(res.data,'cgbfg');
      setElement(res.data.data.totalPage);
      setSearchData(res.data.data.order);
      setLoad(false);
    } catch (error) {
      console.log(error);
      setLoad(true);
    }
  };
  useEffect(() => {
    
    window.scrollTo(0, 0);
  }, [query]);

  
useEffect(()=>{
  fetData()
},[pageSize])
  const handlePagination = (e, page) => {
    // console.log(page - 1)

    setPageSize(page - 1);
  };
  return (
    <>
      <div className="container-fluid contain-grid">
        <div className="grid-view">
          {!isLoad ? (
            searchData.length > 0 &&
            searchData.map((sItem) => {
              return (
                <ProductItemCard
                  img={
                    sItem.images.length > 0 &&
                    imgUrl + sItem.images[0].thumbImage
                  }
                  key={sItem.id}
                  item={sItem}
                  price={
                    sItem.images.length > 0 &&
                    sItem.images[0].productVariantEntities.length > 0 &&
                    sItem.images[0].productVariantEntities[0].price
                  }
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
   
      <div className="mt-3 mb-5">

      <Pagination
            count={element && element}
            color="primary"
            onChange={handlePagination}
          />
   
    </div>

      
    </>
  );
};

const PaginationBox = () => {
  return (
    <>
      <Pagination count={100} color="warning" />
    </>
  );
};

const ProductContentFilter = (props) => {
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
console.log('props',props);
  const fetchData = () => {
    setLoading(true);
    const apiUrl = `https://api.diwamjewels.com/DMJ/api/v1/category/type?type=${searchTxt}`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.data) {
          const categoryDescription = response.data.data.categoryDescription;
          console.log("response.data.data.categoryDescription");
          if (categoryDescription !== null) {
            const categoryDescriptionWithoutHtml = categoryDescription.replace(
              /<[^>]*>/g,
              ""
            );
            setData(categoryDescription);
          } else {
            setData("Category description not available");
          }
        } else {
          setData("Category data not available");
        }
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, [searchTxt]);

  return (
    <>
      <div className="fltr-para-textfnt">
        {loading ? (
          "Loading data..."
        ) : error ? (
          `Error: ${error.message}`
        ) : data ? (
          <div dangerouslySetInnerHTML={{ __html: props.categoryDes }}></div>
        ) : null}
      </div>
    </>
  );
};
