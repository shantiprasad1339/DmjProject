// import { TrendingWrap, SellerWrap } from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import { addSearch } from "../redux/dmjSlice";
import { useDispatch } from "react-redux";

import './ddmenu.css'


const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/category/maincategoryName/";
const subSubEndPoint = 'api/v1/category/subcategory/';

const NavbarDropdown = ({ title, cateData, marginLeft }) => {
 

  useEffect(() => {
    // fetchSubCate()

  }, []);

  return (
    <>


      <ul className="navtab-box-vw" style={{ marginLeft: marginLeft }}

      >
        <div className="navbar-tab-box"
        >

          {
            cateData.length > 0 && cateData.map((item, index) => {
              return (
                <div key={index}>
                  <DropDownMenu title={item.name} id={item.id} />
                </div>
              )
            })
          }

        </div>



      </ul>
    </>
  );
};

export default memo(NavbarDropdown);



const CategoryDetailsListVw = ({ title, subCate }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate()


  async function handleNavbar(val) {
    await dispatch(addSearch(val));
    navigate('/search')
  }


  return (
    <>

      <h6 className="type-catelisthd">{title}</h6>
      <hr />
      {
        subCate.length > 0 && subCate.map((cate, index) => {
          return (
            <p className="list-ptag-font" key={index} onClick={() => handleNavbar(cate.type)}>{cate.type}</p>
          )
        })
      }


    </>
  );
};



const DropDownMenu = ({ title, id }) => {
  const [subCate, setSubCate] = useState([])
  const [isMouseOverMain, setIsMouseOverMain] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {

  //   const timeoutId = setTimeout(() => {
  //     setShowMessage(true);
  //   }, 4000);


  //   return () => clearTimeout(timeoutId);
  // }, []); 


  async function getSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value)
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubCate([])
      }
      else {
        setSubCate(res.data.data)

      }

    }
    catch (err) {
      console.log(err)
      setSubCate([])
    }
  }
  useEffect(() => {
    getSubSubCate(id)
  }, [])

  async function handleNavigate(val) {
    // console.log(val)
    await dispatch(addSearch(val));
    navigate("/search");
  }

  return (
    <div className="ddmenu" onMouseEnter={() => {
      setIsMouseOverMain(true);
      getSubSubCate(id);
    }}
    // onMouseLeave={() => setIsMouseOverMain(false)}
    >
      {/* <nav role="navigation"> */}
        <ul id="nav1">

          <li className="main-cate-list-fnt"><a onClick={() => handleNavigate(title)}>{title}</a>
            <ul className="cate-menu-listvw">

              {subCate.length > 0 &&
                <div>
                  <CategoryDetailsListVw title="SHOP BY TYPE" subCate={subCate} />
                  {/* <CategoryDetailsListVw title="New Arrivals"/>
                              */}

                </div>

              }
            </ul>

          </li>

        </ul>
      {/* </nav> */}
    </div>
  )
}


