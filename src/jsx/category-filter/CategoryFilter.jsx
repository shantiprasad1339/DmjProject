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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { MdOutlineTune } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import Swal from "sweetalert2";

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

  const fetchData = () => {
    setLoading(true);

    const apiUrl = `https://api.diwamjewels.com/DMJ/api/v1/products/search?query=${query}&pageSize=0`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.data) {
          // console.log("cateoryFilterData====>>>>", response.data);
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
  const handlePostRequest = async () => {
    try {
      const response = await fetch(
        "https://www.diwamjewels.com/sitemap-create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed
          },
          body: JSON.stringify({
            url: "https://www.diwamjewels.com" + window.location.pathname,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      setError(error);
    }
  };
  useState(() => {
    handlePostRequest();
  }, []);
  useEffect(() => {
    fetchData();
  }, [searchTxt]);

  return (
    <>
      <HeaderCon />
      <Navbar />

      <div className="mb-5">
        {/* <ProductFilter /> */}
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

const FilterCategoryCard = ({ query }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [colors, setColors] = useState("");
  const [prices, setPrices] = useState("");
  const [pageSize, setPageSize] = useState("0");
  const [element, setElement] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const [colorFilter, setColor] = useState([]);
  const [sizeFilter, setSize] = useState("");
  const [sizeName, setSizeName] = useState("");
  const [priceFilter, setPrice] = useState();
  const [value, setValue] = React.useState(0);
  const [show, setShow] = useState(false);
  const [show5, setShow5] = useState(false);
  const [filterNames, setFilterName] = useState([]);
  const [cateId, setCateId] = useState();
  const [show1, setShow1] = useState(false);
  const [maxPr, setMaxPr] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleShow5 = () => setShow5(true);
  const handleClose5 = () => setShow5(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetData = async () => {
    setLoad(true);
    if (searchData.length == 0) {
      try {
        const res = await axios.get(
          `${proto}${endPoint}${query}&pageSize=${pageSize}`
        );
        setElement(res.data.data.totalPage);
        setSearchData(res.data.data.order);
        setCateId(res.data.data.order[0].categoryId);
        setLoad(false);
      } catch (error) {
        console.log(error);
        setLoad(false);
        Swal.fire("This product is not added yet!");
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  useEffect(() => {
    fetData();
    runFallbackApi();
    window.scrollTo(0, 0);
  }, [pageSize]);
  const handlePagination = (e, page) => {
    setPageSize(page - 1);
  };

  function getFilters() {
    const filterUrl =
      "https://api.diwamjewels.com/DMJ/api/v1/products/filterColorNameOrPrice?categoryId=";

    if (searchData) {
      axios.get(filterUrl + cateId).then((res) => {
        setMaxPr(res.data.data.maxPrice);
        setColor(res.data.data.categoryColors);
        setSize(res.data.data.categorySizes);
        const minPrice = 0;
        const maxPrice = res.data.data.maxPrice;

        const minPriceNum = parseFloat(minPrice);
        const maxPriceNum = parseFloat(maxPrice);

        const priceRange = maxPriceNum - minPriceNum;

        const incrementValue = priceRange / 5;

        const intervals = Array.from({ length: 5 }, (_, i) => {
          const start = minPriceNum + i * incrementValue;
          const end = start + incrementValue;
          return { min: start.toFixed(0), max: end.toFixed(0) };
        });
        setPrice(intervals);
      });
    }
  }
  useEffect(() => {
    getFilters();
  }, [searchData]);

  function filteredProduct(e) {
    e.preventDefault();
    axios
      .get(
        `https://api.diwamjewels.com/DMJ/api/v1/products/filter?${prices}&categoryId=${cateId}&color=${colors}&size=${sizeName}&pageNumber=1`
      )
      .then((res) => {
        console.log(res);
        setSearchData(res.data.data);
        setElement(1);
        handleClose();
        handleClose5();

        handleClose1();
      })
      .catch((error) => {
        Swal.fire("This filter is not added yet!");
        runFallbackApi();
      });
    let maxPrice = "";
    if (prices) {
      const maxPricePart = prices
        .split("&")
        .find((part) => part.includes("maxPrice="));
      if (maxPricePart) {
        maxPrice = maxPricePart.split("=")[1];
      }
    }

    const uniqueFilterNames = new Set();
    if (colors) {
      uniqueFilterNames.add(colors);
    }
    if (maxPrice) {
      uniqueFilterNames.add(maxPrice);
    }
    if (sizeName) {
      uniqueFilterNames.add(sizeName);
    }
    setFilterName(Array.from(uniqueFilterNames));
  }

  const deleteArray = (indexToRemove, item) => {
    const filterItem = filterNames[indexToRemove];
    setFilterName((prevItems) =>
      prevItems.filter((item, index) => index !== indexToRemove)
    );

    if (colors.includes(filterItem)) {
      setSearchData("");
      setColors("");
      axios
        .get(
          `https://api.diwamjewels.com/DMJ/api/v1/products/filter?${prices}&categoryId=${cateId}&color=&size=${sizeName}&pageNumber=1`
        )
        .then((res) => {
          console.log(res);
          setSearchData(res.data.data);
          setElement(1);
        })
        .catch((error) => {
          console.error("Error occurred in colors API:", error);
          Swal.fire("This filter is not added yet!");
          runFallbackApi();
        });
    } else if (prices.includes(filterItem)) {
      setSearchData("");
      setPrices("");
      try {
        axios
          .get(
            `https://api.diwamjewels.com/DMJ/api/v1/products/filter?minPrice=&maxPrice=&categoryId=${cateId}&color=${colors}&size=${sizeName}&pageNumber=1`
          )
          .then((res) => {
            console.log(res);
            setSearchData(res.data.data);
            setElement(1);
          })
          .catch((error) => {
            console.error("Error occurred in prices API:", error);
            Swal.fire("This filter is not added yet!");
            runFallbackApi();
          });
      } catch (error) {
        console.error("Error occurred in try block:", error);
        alert("An error occurred");
      }
    } else if (sizeName.includes(filterItem)) {
      setSearchData("");
      setSizeName("");
      try {
        axios
          .get(
            `https://api.diwamjewels.com/DMJ/api/v1/products/filter?${prices}&categoryId=${cateId}&color=${colors}&size=&pageNumber=1`
          )
          .then((res) => {
            console.log(res);
            setSearchData(res.data.data);
            setElement(1);
          })
          .catch((error) => {
            console.error("Error occurred in sizeName API:", error);
            Swal.fire("This product is not added yet!");
            runFallbackApi();
          });
      } catch (error) {
        console.error("Error occurred in try block:", error);
      }
    }
  };
  const runFallbackApi = () => {
    axios
      .get(`${proto}${endPoint}${query}&pageSize=${pageSize}`)
      .then((res) => {
        // console.log(res);
        setElement(res.data.data.totalPage);
        setSearchData(res.data.data.order);
        setCateId(res.data.data.order[0].categoryId);
        setLoad(false);
        handleClose();
        handleClose5();
      })
      .catch((error) => {
        console.error("Fallback API error:", error);
      });
  };
  return (
    <>
      <div className="container-fluid contain-grid">
        <div className="filters-box-vw d-flex">
          <ul className="filter-flow-view mt-3">
            <li style={{ display: "flex", gap: "20px" }}>
              <MdOutlineTune
                style={{
                  color: "#d2ae19f0",
                  fontSize: "35px",
                  marginRight: "15px",
                }}
              />
            </li>

            <li style={{ display: "flex", gap: "20px" }}>
              {["bottom"].map((placement, idx) => {
                return (
                  <>
                    <h6 onClick={handleShow} className="filter-tab">
                      Colors<i className="bi bi-chevron-down fltr-dwn-icn"></i>
                    </h6>
                    <Offcanvas
                      show={show}
                      onHide={handleClose}
                      placement={placement}
                      style={{ zIndex: "100000", height: "auto" }}
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="sort-fltr-mb">
                          Filters
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <div className="sorting-bottomline"></div>
                      <Offcanvas.Body>
                        <div className="container">
                          <Box
                            sx={{
                              flexGrow: 1,
                              bgcolor: "background.paper",
                              display: "flex",
                            }}
                          >
                            <Tabs
                              orientation="vertical"
                              value={value}
                              onChange={handleChange}
                              aria-label="Vertical tabs example"
                              sx={{ borderRight: 1, borderColor: "divider" }}
                            >
                              <Tab label="Color" {...a11yProps(0)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                              {colorFilter &&
                                colorFilter.map((item, index) => {
                                  return (
                                    <div
                                      className="mb-3 form-check ms-3"
                                      key={index}
                                    >
                                      <input
                                        type="checkbox"
                                        id={`new${index}`}
                                        className="form-check-input checkbox-inpt-bxvw"
                                        onChange={() => {
                                          if (colors === item) {
                                            // Deselect the item if it's already selected
                                            setColors("");
                                          } else {
                                            // Select the item if it's not already selected
                                            setColors(item);
                                          }
                                        }}
                                        checked={colors === item} // Check if the current item is selected
                                      />
                                      <label
                                        className="form-check-label check-lbl-box-vw"
                                        htmlFor={`new${index}`}
                                      >
                                        {item}
                                      </label>
                                    </div>
                                  );
                                })}
                            </TabPanel>
                          </Box>
                        </div>

                        <div className="fltrs-box-buttons-vw mt-4">
                          <button className="clr-fltrs-tab">Clear</button>
                          <button
                            className="aply-fltrs-tab"
                            onClick={filteredProduct}
                          >
                            Apply
                          </button>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </>
                );
              })}

              {["bottom"].map((placement, idx) => {
                return (
                  <>
                    <h6 onClick={handleShow1} className="filter-tab">
                      Price<i className="bi bi-chevron-down fltr-dwn-icn"></i>
                    </h6>
                    <Offcanvas
                      show={show1}
                      onHide={handleClose1}
                      placement={placement}
                      style={{ zIndex: "100000", height: "auto" }}
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="sort-fltr-mb">
                          Filters
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <div className="sorting-bottomline"></div>
                      <Offcanvas.Body>
                        <form action="">
                          <div></div>

                          <h6 className="poplr-fltr-fnt mb-4">
                            Popular Filters
                          </h6>
                          <div className="d-flex flex-wrap">
                            {priceFilter &&
                              priceFilter.map((item, index) => {
                                return (
                                  <div
                                    className="mb-3 form-check ms-3"
                                    key={index}
                                  >
                                    <input
                                      type="checkbox"
                                      className="form-check-input checkbox-inpt-bxvw"
                                      value={`minPrice=${item.min}&maxPrice=${item.max}`}
                                      id={`new${index}`}
                                      onChange={() => {
                                        if (
                                          prices ===
                                          `minPrice=${item.min}&maxPrice=${item.max}`
                                        ) {
                                          // Deselect the item if it's already selected
                                          setPrices("");
                                        } else {
                                          // Select the item if it's not already selected
                                          setPrices(
                                            `minPrice=${item.min}&maxPrice=${item.max}`
                                          );
                                        }
                                      }}
                                      checked={
                                        prices ===
                                        `minPrice=${item.min}&maxPrice=${item.max}`
                                      } // Check if the current item is selected
                                    />
                                    <label
                                      className="form-check-label check-lbl-box-vw"
                                      htmlFor={`new${index}`}
                                    >
                                      {item.min} - {item.max}
                                    </label>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="d-flex justify-content-between mt-4">
                            <button className="clr-fltrs-tab">Clear</button>
                            <button
                              className="aply-fltrs-tab"
                              onClick={filteredProduct}
                            >
                              Apply
                            </button>
                          </div>
                        </form>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </>
                );
              })}

              {["bottom"].map((placement, idx) => {
                return (
                  <>
                    <h6 onClick={handleShow5} className="filter-tab">
                      Size<i className="bi bi-chevron-down fltr-dwn-icn"></i>
                    </h6>
                    <Offcanvas
                      show={show5}
                      onHide={handleClose5}
                      placement={placement}
                      style={{ zIndex: "100000", height: "auto" }}
                    >
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title className="sort-fltr-mb">
                          Filters
                        </Offcanvas.Title>
                      </Offcanvas.Header>
                      <div className="sorting-bottomline"></div>
                      <Offcanvas.Body>
                        <div className="container">
                          <Box
                            sx={{
                              flexGrow: 1,
                              bgcolor: "background.paper",
                              display: "flex",
                            }}
                          >
                            <Tabs
                              orientation="vertical"
                              value={value}
                              onChange={handleChange}
                              aria-label="Vertical tabs example"
                              sx={{ borderRight: 1, borderColor: "divider" }}
                            >
                              <Tab label="size" {...a11yProps(0)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                              {sizeFilter &&
                                sizeFilter.map((item, index) => {
                                  return (
                                    <>
                                      <div className="mb-3 form-check ms-3">
                                        <input
                                          type="checkbox"
                                          id={`new${index}`}
                                          className="form-check-input checkbox-inpt-bxvw"
                                          onChange={() => setSizeName(item)}
                                        />
                                        <label
                                          className="form-check-label check-lbl-box-vw"
                                          for={`new${index}`}
                                        >
                                          {item}
                                        </label>
                                      </div>
                                    </>
                                  );
                                })}
                            </TabPanel>
                          </Box>
                        </div>

                        <div className="fltrs-box-buttons-vw mt-4">
                          <button className="clr-fltrs-tab">Clear</button>
                          <button
                            className="aply-fltrs-tab"
                            onClick={filteredProduct}
                          >
                            Apply
                          </button>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
                  </>
                );
              })}
            </li>
          </ul>
          <ul className="d-flex gap-4 px-4 mt-2 w-50">
            {filterNames &&
              filterNames.map((item, index) => {
                return (
                  <>
                    <li className="FilterNameClass" key={index}>
                      {item}{" "}
                      <RxCross2
                        className="ml-2"
                        style={{ fontSize: "20px" }}
                        onClick={() => deleteArray(index, item)}
                      />
                    </li>
                  </>
                );
              })}
          </ul>
        </div>

        <div className="grid-view">
          {!isLoad ? (
            searchData &&
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

const ProductContentFilter = (props) => {
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const FilterCheckboxView = () => {
  return <></>;
};
