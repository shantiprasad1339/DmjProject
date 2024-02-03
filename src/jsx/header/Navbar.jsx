import { React, useState, memo, useRef } from "react";
import "./newNav.css";
// import logo from "../../assets/images/dmjicon.png";
import searchIcon from "./icons/search.png";
import { NavLink, useNavigate } from "react-router-dom";
// import earring from "../../assets/images/earring1.jpg";
import NavbarDropdown from "./NavbarDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../redux/dmjSlice";
import { useEffect } from "react";
import ThreeLine from "@mui/icons-material/DehazeOutlined";
import CrossIcon from "@mui/icons-material/CloseOutlined";
import menubar from "../../assets/images/menuicon.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import Accordion from "react-bootstrap/Accordion";
import "../search-contentbox/search-input-box.css";
// import newlogoimg from '../../assets/images/newpnglogo.png';
import newdmjlogo from "../../assets/images/newdmjlogo.gif";
import DeskDropdown from "../desktop-dropdown/DeskDropdown";
import axios from "axios";
import timer from "../../assets/images/timer.png";
import image1 from "../../assets/images/earring.jpg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import LoginWithMobileNo from "../login/LoginPage";

const urlimg = "https://images.diwamjewels.com/";
const url = "https://api.diwamjewels.com/DMJ/";
const endPoint2 = "api/v1/user/";
const endPoint = "api/v1/category/navbarItem";
const subSubEndPoint = "api/v1/category/subcategory/";
const userId = localStorage.getItem("userId");

function Navbar() {
  async function fetchMenu() {
    try {
      const res = await axios.get(url + endPoint);
      // console.log(res.data.data)
      setCate(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const [isJwelOpen, setIsJwelOpen] = useState(false);
  const [isArtOpen, setIsArtOpen] = useState(false);
  const [isCarpet, setIsCarpet] = useState(false);
  const [isMobNav, setIsMobNav] = useState(true);

  const [search, setSearch] = useState("");

  const [profile, setProfile] = useState(false);

  const dispatch = useDispatch();
  const searchTxt = useSelector((state) => state.product.search.payload);
  const [cateData, setCate] = useState([]);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const navigate = useNavigate();

  const [wishLength, setWishLength] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const [userName, setUserName] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // async function handleSearch(e) {
  //   e.preventDefault();
  //   setSearch(e.target.value);
  //   dispatch(addSearch(e.target.value));

  // }

  // async function handleProSearch() {
  //   navigate("/search");
  // }

  async function handleProfile() {
    setProfile(true);
  }

  async function handleSignOut() {
    localStorage.removeItem("userId");
    localStorage.clear();
    navigate("/");
  }

  function handleJewelEnter() {
    setIsJwelOpen(!isJwelOpen);
    setIsArtOpen(false);
    setIsCarpet(false);
    // Clear any previous timeout (if any)
    clearTimeout(hoverTimeout);
    // /console.log('fired')
  }

  async function fetchUserData() {
    // console.log(userId);
    try {
      const res = await axios.get(url + endPoint2 + userId);
      // console.log(res.data.data.userName)
      const userName = res.data.data.userName;
      const firstWord = userName.split(" ")[0];
      setUserName(firstWord);
    } catch (err) {
      console.log(err);
    }
  }

  function handleArtEnter() {
    setIsArtOpen(!isArtOpen);
    setIsJwelOpen(false);
    setIsCarpet(false);
    // Clear any previous timeout (if any)
    clearTimeout(hoverTimeout);
  }

  function handleCraft() {
    setIsCarpet(!isCarpet);
    setIsJwelOpen(false);
    setIsArtOpen(false);
    // Clear any previous timeout (if any)
    clearTimeout(hoverTimeout);
  }

  const dropdownRef = useRef(null);
  // Function to close the dropdown when a click occurs outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsJwelOpen(false);
      setIsArtOpen(false);
      setIsCarpet(false);
    }
  };

  useEffect(() => {
    // console.log(searchTxt)
    let userId = localStorage.getItem("userId");
    let wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    const uniqueWishList = [...new Set(wishList)];
    setWishLength(uniqueWishList.length);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(cart.length);

    if (userId) {
      fetchUserData();
    }
    setSearch(searchTxt);
    fetchMenu();
    // Attach the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchTxt]);

  const handleMouseEnter = () => {
    setIsJwelOpen(true);
    setIsArtOpen(false);
    setIsCarpet(false);
  };

  const handleMouseEnter1 = () => {
    setIsJwelOpen(false);
    setIsArtOpen(true);
    setIsCarpet(false);
  };

  const handleMouseEnter2 = () => {
    setIsJwelOpen(false);
    setIsArtOpen(false);
    setIsCarpet(true);
  };

  const handleMouseLeave = () => {
    setIsJwelOpen(false);
    setIsArtOpen(false);
    setIsCarpet(false);
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("mouseover", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mouseover", handleClickOutside);
    };
  }, []);

  // const [issearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  const searchBoxRef = useRef(null);

  useEffect(() => {
    // Add an event listener to close the results when clicking outside
    document.addEventListener("click", handleClickSOutside);

    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleClickSOutside);
    };
  }, []);

  const handleClickSOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setIsResultsOpen(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query);

    // Make an API request when the user types in the search input
    axios
      .get(
        "https://api.diwamjewels.com/DMJ/api/v1/category/search?query=" + query
      )
      .then((response) => {
        // console.log(response.data.data)
        setSearchResults(response.data.data);
        setIsResultsOpen(true); // Show results when there are results
      })
      .catch((err) => {
        setError(err);
        setIsResultsOpen(false);
      });
  };

  const handleProSearch = (e) => {
    e.preventDefault();
    navigate(`/c/${search}`);
    dispatch(addSearch(search));
  };

  return (
    <>
      <div
        className="nav-outer-dropdown nav-drop-shadow shadow desktop-navbar-vw"
        ref={dropdownRef}
      >
        <div className="navOuter shadow-sm">
          <NavLink to="/">
            <div className="nav-logo">
              <img src={newdmjlogo} alt="logo" />
            </div>
          </NavLink>
          <ul>
            <div className="nav-product">
              <li
                className="dropdown1 mt-2"
                onClick={() => handleJewelEnter()}
                onMouseEnter={handleMouseEnter}
              >
                <NavLink
                  className="nav-box-product"
                  style={isJwelOpen ? { color: "#d0b646" } : null}
                >
                  Jewellery{" "}
                  {!isJwelOpen ? (
                    <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                  ) : (
                    <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                  )}
                </NavLink>
              </li>

              <li
                className="dropdown1 mt-2"
                onClick={() => handleArtEnter()}
                onMouseEnter={handleMouseEnter1}
                
              >
                <NavLink
                  className="nav-box-product"
                  style={isArtOpen ? { color: "#d0b646" } : null}
                >
                  HandiCraft{" "}
                  {!isArtOpen ? (
                    <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                  ) : (
                    <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                  )}
                </NavLink>
              </li>
              <li
                className="mt-2 dropdown1"
                onClick={() => handleCraft()}
                onMouseEnter={handleMouseEnter2}
                // onMouseLeave={() => handleLeaveMouse()}
              >
                <NavLink
                  className="nav-box-product"
                  style={isCarpet ? { color: "#d0b646" } : null}
                >
                  Blue Pottery{" "}
                  {!isCarpet ? (
                    <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                  ) : (
                    <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                  )}
                </NavLink>
              </li>
            </div>
          </ul>

          <form onSubmit={handleProSearch}>
            <div className="nav-box-search" ref={searchBoxRef}>
              <input
                type="text"
                className="nav-search"
                value={search}
                onChange={handleSearch}
                o
              />
              <button
                type="submit"
                style={{ background: "transparent", border: "none" }}
              >
                <img
                  src={searchIcon}
                  className="nav-search-icon"
                  onClick={()=>{
                    handleProSearch()
                  }}
                />
              </button>
            </div>
          </form>

          {isResultsOpen && ( // Only show search results if isResultsOpen is true
            <div className="srch-ipt-cntet-bx">
              <h6 className="mt-2">
                <b>Search Results</b>
              </h6>
              {searchResults.map((result) => (
                <ImageWithSearch
                  key={result.name}
                  detail={result.name}
                  image={urlimg + result.image}
                  query={result.name}
                
                />
              ))}
            </div>
          )}

          <div className="nav-account">
            <div
              className="nav-box ms-5"
              onClick={() => {
                setProfile(!profile);
              }}
            >
              <div className="">
                <i
                  className="bi bi-person-circle nav-icon-item"
                  style={{ position: "relative", top: "-2px" }}
                ></i>
                <br />
                <p className="user-name-fntsz">
                  Hi, {userId ? userName : "Guest"}
                </p>
              </div>
            </div>
            {profile && (
              <div className="more-profile">
                {!userId && userId == undefined ? (
                  <li
                    // onClick={async () => {
                    //   navigate("/defaultlogin");
                    // }}

                    onClick={handleShow}
                  >
                    Log In / Sign Up
                  </li>
                ) : (
                  <>
                    <li onClick={() => navigate("/profile")}>Profile</li>
                    <li
                      className="mt-2"
                      onClick={() => {
                        handleSignOut();
                        window.location.reload();
                      }}
                    >
                      Sign Out
                    </li>
                  </>
                )}
              </div>
            )}

            <Modal
              centered
              show={showModal}
              onHide={handleClose}
              style={{ zIndex: "60000" }}
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <LoginWithMobileNo />
              </Modal.Body>
            </Modal>
            <div className="nav-box ms-4">
              <NavLink to="/wishlist">
                {" "}
                <div className="show-numbericn">
                  <i className="bi bi-suit-heart-fill nav-icon-item "></i>
                  <div className="number-icon-sz">{wishLength}</div>
                </div>
              </NavLink>
            </div>
            <div className="nav-box ms-4">
              <NavLink to="/addToCart">
                {" "}
                <div className="show-numbericn">
                  <i className="bi bi-cart4 nav-icon-item"></i>
                  <div className="number-icon-sz">{cartLength}</div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>

        <div className="navbar-mobile">
          <div className="nav-mob-icon">
            <img src={newdmjlogo} alt="logo" className="nav-logo" />
            {isMobNav ? (
              <ThreeLine
                onClick={() => {
                  setIsMobNav(false);
                }}
              />
            ) : (
              <CrossIcon
                onClick={() => {
                  setIsMobNav(true);
                  setIsJwelOpen(false);
                  setIsArtOpen(false);
                  setIsCarpet(false);
                }}
              />
            )}
          </div>
          {!isMobNav ? (
            <div className="nav-mobile-item">
              <ul>
                <div className="nav-product">
                  <li
                    className="dropdown1 mt-2"
                    onClick={() => {
                      setIsJwelOpen(!isJwelOpen);
                      setIsArtOpen(false);
                      setIsCarpet(false);
                    }}
                  >
                    <NavLink
                      className="nav-box-product"
                      style={isJwelOpen ? { color: "#d0b646" } : null}
                    >
                      Jewellery{" "}
                      {!isJwelOpen ? (
                        <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                      ) : (
                        <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                      )}
                    </NavLink>
                  </li>

                  <li
                    className="dropdown1 mt-2"
                    onClick={() => {
                      setIsArtOpen(!isArtOpen);
                      setIsJwelOpen(false);
                      setIsCarpet(false);
                    }}
                  >
                    <NavLink
                      className="nav-box-product"
                      style={isArtOpen ? { color: "#d0b646" } : null}
                    >
                      Art & Craft{" "}
                      {!isArtOpen ? (
                        <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                      ) : (
                        <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                      )}
                    </NavLink>
                  </li>
                  <li
                    className="mt-2 dropdown1"
                    onClick={() => {
                      setIsCarpet(!isCarpet);
                      setIsJwelOpen(false);
                      setIsArtOpen(false);
                    }}
                  >
                    <NavLink
                      className="nav-box-product"
                      style={isCarpet ? { color: "#d0b646" } : null}
                    >
                      Carpet{" "}
                      {!isCarpet ? (
                        <i className="bi bi-chevron-down caret-icon-sz ms-2 mt-1"></i>
                      ) : (
                        <i className="bi bi-chevron-up caret-icon-sz ms-2 mt-1"></i>
                      )}
                    </NavLink>
                  </li>
                </div>
              </ul>
              <div className="nav-box-search" onClick={toggleOpen}>
                <form onSubmit={handleProSearch}>
                  <input
                    type="text"
                    className="nav-search"
                    value={search}
                    onChange={handleSearch}
                  />
                  <button type="submit">
                    <img
                      src={searchIcon}
                      className="nav-search-icon"
                      onClick={handleProSearch}
                    />
                  </button>
                </form>
              </div>

              {issearchOpen && (
                <>
                  <div className="srch-ipt-cntet-bx">
                    <ImageWithSearch detail="Rings" image={image1} />
                    <ImageWithSearch detail="Necklace" image={image1} />
                    <ImageWithSearch detail="Bangles" image={image1} />
                  </div>
                </>
              )}

              <div className="nav-account">
                <div
                  className="nav-box"
                  onClick={() => {
                    setProfile(!profile);
                  }}
                >
                  <div>
                    <i
                      className="bi bi-person-circle nav-icon-item ms-5"
                      style={{ position: "relative", top: "-2px" }}
                    ></i>
                    <br />
                    <p className="user-name-fntsz">
                      Hi, {userId ? userName : "Guest"}
                    </p>
                  </div>
                </div>
                {profile && (
                  <div className="more-profile">
                    {!userId && userId == undefined ? (
                      <li
                        onClick={async () => {
                          navigate("/login");
                        }}
                      >
                        Log In / Sign Up
                      </li>
                    ) : (
                      <>
                        <li
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          Profile
                        </li>
                        <li
                          className="mt-2"
                          onClick={() => {
                            handleSignOut();
                            window.location.reload();
                          }}
                        >
                          Sign Out
                        </li>
                      </>
                    )}
                  </div>
                )}
                <div className="nav-box">
                  <i className="bi bi-suit-heart-fill nav-icon-item ms-4"></i>
                </div>
                <div className="nav-box">
                  <i className="bi bi-cart4 nav-icon-item ms-4"></i>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {isJwelOpen && cateData.length > 0 ? (
          <DeskDropdown
            title="jewellery"
            cateData={cateData[0].subCategory}
            marginLeft="140px"
            handleNavMouseEnter={handleJewelEnter}
            onMouseLeave={handleMouseLeave}
            
          />
        ) : null}
        {isArtOpen && cateData.length > 0 ? (
          <DeskDropdown
            title="art"
            cateData={cateData[1].subCategory}
            marginLeft="170px"
            handleNavMouseEnter={handleArtEnter}
            onMouseLeave={handleMouseLeave}
          />
        ) : null}
        {isCarpet && cateData.length > 0 ? (
          <DeskDropdown
            title="carpet"
            cateData={cateData[2].subCategory}
            marginLeft="200px"
            handleNavMouseEnter={handleCraft}
            onMouseLeave={handleMouseLeave}
            
          />
        ) : null}
      </div>

      <div className="nav-outer-dropdown nav-drop-shadow shadow mobile-navbarview p-2">
        <div className="d-flex justify-content-between">
          <NavLink to="/">
            <div className="nav-logo">
              <img src={newdmjlogo} alt="logo" />
            </div>
          </NavLink>

          <div className="d-flex mt-2">
            {/* <div className="ms-3">
              {" "}
              <i
                className="bi bi-search nav-icon-item"
                onClick={toggleBoxVisibility}
              ></i>
            </div> */}
            <NavLink to="/wishlist">
              {" "}
              <div className="show-numbericn">
                <i className="bi bi-suit-heart-fill nav-icon-item ms-3"></i>
                <div className="number-icon-sz">{wishLength}</div>
              </div>
            </NavLink>
            <NavLink to="/addToCart">
              {" "}
              {/* <i className="bi bi-cart4 nav-icon-item ms-3"></i> */}
              <div className="show-numbericn">
                <i className="bi bi-cart4 nav-icon-item ms-3"></i>
                <div className="number-icon-sz">{cartLength}</div>
              </div>
            </NavLink>

            <NavLink
              className="text-decoration-none"
              onClick={() => {
                setProfile(!profile);
              }}
            >
              <div style={{ marginTop: "-6px" }}>
                <i className="bi bi-person-circle nav-icon-item ms-4"></i>
                <br />
                <p className="user-name-fntsz1">
                  Hi, {userId ? userName : "Guest"}
                </p>
              </div>
            </NavLink>
            {profile && (
              <div className="more-profile">
                {!userId && userId == undefined ? (
                  <li
                    onClick={async () => {
                      navigate("/login");
                    }}
                  >
                    Log In / Sign Up
                  </li>
                ) : (
                  <>
                    <li
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </li>
                    <li
                      className="mt-2"
                      onClick={() => {
                        handleSignOut();
                        window.location.reload();
                      }}
                    >
                      Sign Out
                    </li>
                  </>
                )}
              </div>
            )}

            {/* <MenuBarList  /> */}
            <div className="mobile-navbarview">
              {["start"].map((placement, idx) => (
                <MobileMenuBar
                  key={idx}
                  placement={placement}
                  name={placement}
                  cateData={cateData}
                  sch={true}
                  image={menubar}
                />
              ))}
            </div>
            {/* <div className='ms-3'><img src={menubar} alt="icon" className="menubar-icon-nav" /></div> */}
          </div>
        </div>
        {/* {isBoxVisible && <SearchInputContent toggleBoxVisibility={toggleBoxVisibility} />} */}
      </div>
    </>
  );
}

export default Navbar;

function MobileMenuBar({ cateData, sch, ...props }) {
  // console.log(cateData)
  const [show, setMenuShow] = useState(false);

  const handleClose = () => setMenuShow(false);
  const handleShow = () => setMenuShow(true);

  const [searchResults, setSearchResults] = useState([]);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  const searchTxt = useSelector((state) => state.product.search.payload);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    const searchText = e.target.value.trim(); // Trim leading and trailing whitespaces
  
    setSearch(searchText);
    dispatch(addSearch(searchText));
  
    try {
      if (searchText !== '') {
        const response = await axios.get(
          "https://api.diwamjewels.com/DMJ/api/v1/category/search?query=" + searchText
        );
        setSearchResults(response.data.data);
        setIsResultsOpen(true);
      } else {
        // Clear the results and close the results panel when there is no search text
        setSearchResults([]);
        setIsResultsOpen(false);
      }
    } catch (err) {
      console.error(err);
      setIsResultsOpen(false);
    }
  }
  
  useEffect(() => {
    // console.log(searchTxt)
    setSearch(searchTxt);
  }, [searchTxt]);
  async function handleProSearch(e) {
    e.preventDefault();
    navigate(`/c/${e.target.value}`);
    dispatch(addSearch(e.target.value));
    // toggleBoxVisibility()
  }
  const urlimg =  "https://images.diwamjewels.com/";

  return (
    <>
      <div className="ms-3" onClick={handleShow}>
        <img src={props.image} alt="icon" className="menubar-icon-nav" />
      </div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        style={{ zIndex: "40000" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {sch && (
            <form
              className="d-flex mb-3 justify-content-center"
              onSubmit={handleProSearch}
            >
              <input
                type="text"
                className="srch-input-box w-100"
                placeholder="Search here..."
                value={search}
                onChange={handleSearch}
              />
              <button type="submit" className="search-offbtn">
                Search
              </button>
            </form>
          )}
          {isResultsOpen === true
            ? searchResults.map((result) => {
               return(
                <>
                <ImageWithSearch
                  key={result.name}
                  detail={result.name}
                  image={urlimg + result.image}
                  query={result.name}
                />
                </>
               )
              })
            : ""}
          {cateData.length > 0 &&
            cateData.map((cate) => {
              // console.log(cate)
              return (
                <AccordianMenuList
                  title={cate.type}
                  subCateDate={cate.subCategory}
                  handleClose={handleClose}
                  
                />
              );
            })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function AccordianMenuList({ title, subCateDate, handleClose }) {
  // console.log(subCateDate)
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0" className="accord-item-list-box">
          <Accordion.Header className="menucate-title-fnt">
            {title}
          </Accordion.Header>
          <Accordion.Body>
            {subCateDate.map((item) => {
              // console.log(item)
              if (
                item.name == "Gold Jewellery" ||
                item.name == "Silver Jewellery"
              ) {
                <></>;
              } else {
                return (
                  <AccordianSubMenu
                    title={item.name}
                    id={item.id}
                    handleClose={handleClose}
                  />
                );
              }
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export { AccordianMenuList, MobileMenuBar, AccordianSubMenu };

function AccordianSubMenu({ title, id, handleClose }) {
  const [subCate, setSubCate] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function getSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubCate([]);
      } else {
        setSubCate(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubCate([]);
    }
  }
  useEffect(() => {
    getSubSubCate(id);
  }, []);

  // console.log(id)/
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0" className="accord-item-list-box">
          <Accordion.Header className="menucate-title-fnt">
            {title}
          </Accordion.Header>
          <Accordion.Body>
            <h6 className="list-fntsz-mbvw">Shop by Category</h6>
            {subCate.length > 0 &&
              subCate.map((item, index) => {
                return (
                  <>
                    <p
                      className="list-ptag-font"
                      key={index}
                      onClick={() => {
                        handleClose();
                        dispatch(addSearch(item.type));
                        navigate("/search");
                      }}
                    >
                      {item.type}
                    </p>
                  </>
                );
              })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

const SearchInputContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="nav-box-search mt-2 mb-3" onClick={toggleOpen}>
        <input type="text" className="nav-search" />
        <img src={searchIcon} className="nav-search-icon" />
      </div>

      {isOpen && (
        <>
          <div className="srch-ipt-cntet-bx">
            <SearchDetails title="Jewellery" />
            <SearchDetails title="Handi Craft" />
            <SearchDetails title="Blue Pottery" />
            <h6 className="mt-2">
              <b>Discover More</b>
            </h6>
            <ImageWithSearch detail="Rings" image={image1} />
            <ImageWithSearch detail="Necklace" image={image1} />
            <ImageWithSearch detail="Bangles" image={image1} />
          </div>
        </>
      )}
    </>
  );
};

const SearchDetails = (props) => {
  return (
    <>
      <div className="d-flex">
        <img src={timer} alt="icon" className="timer-iconsz" />
        <p className="srch-ipt-detail-ptag">{props.title}</p>
      </div>
    </>
  );
};

const ImageWithSearch = (props) => {
  const navigate = useNavigate();
  const handleRefreshClick = () => {
    // Reload the web page
    window.location.reload();
  };

  const handleButtonClick = (query) => {
    navigate(`/c/${query}`);
    handleRefreshClick()
  };

  return (
    <>
      <div
        className="d-flex mt-2"
        onClick={() => handleButtonClick(props.query)}
      >
        <img src={props.image} alt="icon" className="search-img-dtl1" />
        <p className="srch-ipt-detail-ptag mt-2" >{props.detail}</p>
      </div>
    </>
  );
};
