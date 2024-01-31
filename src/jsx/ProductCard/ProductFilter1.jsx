import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import "./productFilter1.scss";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addSearch } from "../redux/dmjSlice";
import filter from '../../assets/images/filter.png';
import { MobileMenuBar } from "../header/Navbar";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/category/maincategory";

const endPoint2 = "api/v1/category";


function ProductFilter1({ name, ...props }) {
  const [category, setCategory] = useState([]);

  async function fetchMainCategory() {
    try {
      const res = await axios.get(`${url}${endPoint}`);
      // console.log(res.data.data)
      setCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  // const navigate = useNavigate()
  const dispatch = useDispatch();

  // console.log(img)
  async function handleNavigate(val) {
    await dispatch(addSearch(val));
  }

  async function fetchMenu() {
    try {
      const res = await axios.get(url + endPoint2);
      console.log(res.data.data)
      setCate(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMainCategory();
    fetchMenu()
  }, []);


  const [cateData, setCate] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  return (
    <>
      {/* <div className="accor-width">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="pro-hd-font">Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul data-accordion className="categories">
              {category.map((item) => {
                return (
                  <li className="subcat-font" key={item.id}>
                    <input
                      type="radio"
                      name="category"
                      id={item.id}
                      onChange={() => {
                        handleNavigate(item.type);
                       
                      }}
                    />
                    <label htmlFor={item.id}>{item.type}</label>
                   
                  </li>
                );
              })}
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div> */}

      {/* <div className="desktop-fltr-box">
        <div className="" style={{ width: '85px', marginLeft: '40px' }}>
          <h6 onClick={handleShow} className="sort-fltr-mb">
            <img src={filter} alt="filter" className="filter-iconsz" />
            Filters
          </h6>
        </div>
        <Offcanvas show={show} onHide={handleClose} {...props} className="offcanvas-endvw-shw">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="sort-fltr-mb">FILTERS BY</Offcanvas.Title>
          </Offcanvas.Header>
          <div className="sorting-bottomline"></div>
          <Offcanvas.Body>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className="pro-hd-font">Jewellery</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="accord-details-vw">
                    {/* <p>Jewellery</p>
            <p>Handi Craft</p>
            <p>Blue Pottery</p>

                    <MultilevelFilter  />

                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Offcanvas.Body>
        </Offcanvas>
      </div> */}


      <div className="desktop-mob-vw-bx">
      <MobileMenuBar
        cateData={cateData}
        sch={false}
        image={filter}
      /> 
     <h6 className="sort-fltr-mb">Filters</h6>
      </div>


      <div className="mobview-filter-box">
        <SortingFilters />
        <div className="fltr-bdr-linevw"></div>
        {/* <FiltersBoxView /> */}
        <div className="d-flex"><MobileMenuBar
        cateData={cateData}
        sch={false}
        image={filter}
      />
      </div>
      </div>
    </>
  );
}

export default ProductFilter1;


const SortFilterBox = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h6 onClick={handleShow} className="sort-fltr-mb">
        Sort
      </h6>
      <Offcanvas show={show} onHide={handleClose} {...props} style={{ height: '300px' }}>
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
  )
}

function SortingFilters() {
  return (
    <>
      {['bottom'].map((placement, idx) => (
        <SortFilterBox key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

const RadioSorting = (props) => {
  return (
    <>
      <div className="d-flex justify-content-between">
        <label htmlFor="" className="radiostr-fntsz">{props.name}</label>
        <input type="radio" />
      </div>
    </>
  )
}

const FilterPopBox = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <h6 onClick={handleShow} className="sort-fltr-mb">
        Filters
      </h6>
      <Offcanvas show={show} onHide={handleClose} {...props} className="offcanvas-endvw-shw">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="sort-fltr-mb">FILTERS BY</Offcanvas.Title>
        </Offcanvas.Header>
        <div className="sorting-bottomline"></div>
        <Offcanvas.Body>
          <FilterContentInfo title="Category" />
          <FilterContentInfo title="Brand" />
          <FilterContentInfo title="Color" />
          <FilterContentInfo title="Size" />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

function FiltersBoxView() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <FilterPopBox key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

const FilterContentInfo = (props) => {
  return (
    <>
     

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="pro-hd-font">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="accord-details-vw">
              <MultilevelFilter />
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

const MultilevelFilter = () => {
  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="pro-hd-font">Shop by category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="accord-details-vw">
              <p>Gold Ring</p>
              <p>Silver Ring</p>
              <p>Metal Ring</p>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}