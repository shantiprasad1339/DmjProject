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
import filter from "../../assets/images/filter.png";
import { NavLink } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const proto = "https://api.diwamjewels.com/DMJ/";
const imgUrl = "https://images.diwamjewels.com/";
const endPoint = "api/v1/products/search?query=";

const CategoryFilter = () => {
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryDes, setCategoryDes] = useState();
  const params = useParams();
  const query = params.page;
  console.log("useParams", params.page);
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
        {/* <ProductFilter /> */}
        <FilterTabView />
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState("0");
  const [element, setElement] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoad, setLoad] = useState(false);

  const fetData = async () => {
    setLoad(true);
    try {
      const res = await axios.get(
        `${proto}${endPoint}${query}&pageSize=${pageSize}`
      );
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

  useEffect(() => {
    fetData();
  }, [pageSize]);
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
            // <Loader />
          <>
           

             <div style={{textAlign:'center'}}>
              <img src="https://www.sealwatertech.co.za/error.png" alt="" />
              <h4 style={{fontSize:'30px', fontWeight:'500', color:'#A2A2A2', textAlign:'center', marginTop:'20px' }}>This Product is Not Listed Yet</h4>
              </div>
          </>
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
  console.log("props", props);
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

const FilterTabView = () => {
  return (
    <>
      <div className="filters-box-vw">
        <ul className="filter-flow-view mt-3">
          <li>
            <SortingFilters />
          </li>

          <li>
            <FiltersTabs />
          </li>
          <li>
            <BrandingFilters />
          </li>

          <li>
            <BrandingFilters />
          </li>
          <li>
            <BrandingFilters />
          </li>
          <li>
            <BrandingFilters />
          </li>
        </ul>
      </div>
    </>
  );
};

const SortFilterBox = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h6 onClick={handleShow} className="filter-tab">
        Sort By<i className="bi bi-chevron-down fltr-dwn-icn"></i>
      </h6>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "100000", height: "auto" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="sort-fltr-mb">SORT BY</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="sorting-bottomline"></div>
        <Offcanvas.Body>
          <RadioSorting name="Relevence" />
          <RadioSorting name="Popularity" />
          <RadioSorting name="Price : Low to High" />
          <RadioSorting name="Price : High to Low" />
          <RadioSorting name="Newest First" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

function SortingFilters() {
  return (
    <>
      {["bottom"].map((placement, idx) => (
        <SortFilterBox key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

const RadioSorting = (props) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <label htmlFor="" className="radiostr-fntsz">
          {props.name}
        </label>
        <input type="radio" />
      </div>
    </>
  );
};

const BrandFilterBox = ({ name, ...props }) => {
  const [brandshow, setBrandShow] = useState(false);

  const handleClose = () => setBrandShow(false);
  const handleShow = () => setBrandShow(true);

  return (
    <>
      <h6 onClick={handleShow} className="filter-tab">
        Brand<i className="bi bi-chevron-down fltr-dwn-icn"></i>
      </h6>
      <Offcanvas
        show={brandshow}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "100000", height: "auto" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="sort-fltr-mb">Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="sorting-bottomline"></div>
        <Offcanvas.Body>
          <form action="">
            <div>
              <input
                type="text"
                placeholder="Search"
                className="srch-brnd-input"
              />
              <i className="bi bi-search fltr-srch-icnvw"></i>
            </div>

            <h6 className="poplr-fltr-fnt mb-4">Popular Filters</h6>
            <div className="d-flex flex-wrap">
              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Sukhi
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Brado jewellery
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  SAIYONI
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Samridhi DC
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Atasi International
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  DC
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Karishma Kreations
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="clr-fltrs-tab">Clear</button>
              <button className="aply-fltrs-tab">Apply</button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

function BrandingFilters() {
  return (
    <>
      {["bottom"].map((placement, idx) => (
        <BrandFilterBox key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

const FilterCardBox = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h6 onClick={handleShow} className="filter-tab">
        Filter<i className="bi bi-chevron-down fltr-dwn-icn"></i>
      </h6>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "100000", height: "auto" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="sort-fltr-mb">Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="sorting-bottomline"></div>
        <Offcanvas.Body>
        <div className="container">
        <MainFiltersCard />
        </div>
        

        <div className="fltrs-box-buttons-vw mt-4">
              <button className="clr-fltrs-tab">Clear</button>
              <button className="aply-fltrs-tab">Apply</button>
            </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

function FiltersTabs() {
  return (
    <>
      {["bottom"].map((placement, idx) => (
        <FilterCardBox key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

// const MainFiltersCard = () => {
//   return(
//     <>
//       <h1>hello</h1>
//     </>
//   )
// }


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function MainFiltersCard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Brand" {...a11yProps(0)} />
        <Tab label="Discount" {...a11yProps(1)} />
        <Tab label="Price" {...a11yProps(2)} />
        <Tab label="Color" {...a11yProps(3)} />
        <Tab label="Offers" {...a11yProps(4)} />
        <Tab label="Category" {...a11yProps(5)} />
        <Tab label="Material" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FilterCheckboxView />
      </TabPanel>
      <TabPanel value={value} index={1}>
       <FilterCheckboxView />
      </TabPanel>
      <TabPanel value={value} index={2}>
       <FilterCheckboxView />
      </TabPanel>
      <TabPanel value={value} index={3}>
       <FilterCheckboxView />
      </TabPanel>
      <TabPanel value={value} index={4}>
       <FilterCheckboxView />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <FilterCheckboxView />
      </TabPanel>
      <TabPanel value={value} index={6}>
       <FilterCheckboxView />
      </TabPanel>
    </Box>
  );
}

const FilterCheckboxView = () => {
  return (
    <>
      <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Sukhi
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Brado jewellery
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  SAIYONI
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Samridhi DC
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Atasi International
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  DC
                </label>
              </div>

              <div className="mb-3 form-check ms-3">
                <input
                  type="checkbox"
                  className="form-check-input checkbox-inpt-bxvw"
                />
                <label className="form-check-label check-lbl-box-vw" for="">
                  Karishma Kreations
                </label>
              </div>
    </>
  )
}