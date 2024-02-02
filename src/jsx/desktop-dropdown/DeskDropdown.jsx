import React, { useState, useEffect, memo } from "react";
import "./dropdown-menu.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import editorimg from "../../assets/images/earring.jpg";
import axios from "axios";

const url = "https://api.diwamjewels.com/DMJ/";
const endPoint = "api/v1/category/maincategoryName/";
const subSubEndPoint = "api/v1/category/subcategory/";

const DeskDropdown = ({ cateData }) => {
  return (
    <>
      <NewDropdownMenu cateData={cateData} />
    </>
  );
};

export default DeskDropdown;

const NewDropdownMenu = ({ cateData }) => {
  const [activeCategory, setActiveCategory] = useState("Faishon Jewellery");
  const [subcategoryOpen, setSubcategoryOpen] = useState(false);
  const [subCateData, setSubCateData] = useState([]);
  const [showSubsubcategory, setShowSubsubcategory] = useState(false);
  const [activesubsubCategory, setActivesubsubCategory] = useState("Ring");
  const [subSubCateData, setSubsubCateData] = useState([]);
  let showsideLine = false;
  async function getSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      // console.log(res.data.data)
      if (!res.data.data) {
        setSubCateData([]);
      } else {
        setSubCateData(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubCateData([]);
    }
  }

  async function getMainSubSubCate(value) {
    // console.log(value)
    try {
      const res = await axios.get(url + subSubEndPoint + value);
      console.log(res.data);
      if (!res.data.data) {
        showsideLine = false;
        setSubsubCateData([]);
      } else {
        showsideLine = true;
        setSubsubCateData(res.data.data);
      }
    } catch (err) {
      console.log(err);
      setSubsubCateData([]);
    }
    console.log(showsideLine);
  }

  const handleCategoryMouseOver = async (category, id) => {
    // console.log(category)
    setActiveCategory(category);
    getSubSubCate(id);
  };

  const handleSubCategoryMouseOver = async (category, id) => {
    console.log(id);
    console.log(category);
    setActivesubsubCategory(category);
    getMainSubSubCate(id);
    setShowSubsubcategory(true);
  };

  const handleCategoryMouseOut = async () => {
    // setActiveCategory(null);
    setShowSubsubcategory(false);
  };

  let navigate = useNavigate();
  const handleRefreshClick = () => {
    // Reload the web page
    window.location.reload();
  };
  return (
    <>
      <div className="new-menu-boxvw">
        <div className="d-flex">
          <div className="" style={{ width: "350px" }}>
            {/* <p className="cate-hd-fntsz">
              {/* All Jewellery Categories <ArrowRightAltIcon /> 
            </p> */}

            {cateData &&
              cateData.length > 0 &&
              cateData.map((item) => {
                if (item.type == "Gold Jewellery" || item.type == "Silver Jewellery") {
                  return (
                    <>

                    </>
                  );

                } else {
                  return (
                    <>

                      <MainCategory
                        category={item.type}
                        count={item.count}
                        isActive={activeCategory === item.type}
                        onMouseOver={() =>
                          handleCategoryMouseOver(item.type, item.id)
                        }
                      />
                      {/* <p>{item.type}</p> */}

                    </>
                  );
                }

              })}
          </div>

          <div className="linefrleft"></div>
          {
            <div className="row" style={{ width: "1000px" }}>
              <div className="col-md-3">
                {/* <p className="main-cate-fnt-sz">{props.submaincategory}</p>
                 */}

                {subCateData &&
                  subCateData.length > 0 &&
                  subCateData.map((cateList) => {
                    {
                      /* {
                      console.log("subCateData:", subCateData);
                    } */
                    }
                    return (
                      <>
                        {/* <SubcategoryList
                                  subcategory={cateList.type}
                                  onMouseEnter={handleSubCategoryMouseOver} 
                                  onMouseLeave={handleCategoryMouseOut}
                                /> */}

                        <SubcategoryList
                          subcategory={cateList.type}
                          sbcount={cateList.count}
                          onMouseEnter={() =>
                            handleSubCategoryMouseOver(
                              cateList.type,
                              cateList.id
                            )
                          }

                       
                        />
                      </>
                    );
                  })}
              </div>
              {/* This is sub sub categoery */}

              <div className="linefrleft"></div>
              <div className="col-md-4">
                {showSubsubcategory &&
                  subSubCateData.map((item) => {
                    return (
                      <p
                        className="subcate-fnt-sz"
                        onClick={() => {
                          navigate(`/c/${item.type}`)
                          handleRefreshClick()

                        }}
                      >
                        {item.name}
                      </p>
                    );
                  })}
              </div>

              {/* <EditorPick /> */}
            </div>
          }
        </div>
      </div>
    </>
  );
};

const MainCategory = ({
  count,
  isActive,
  onMouseOver,
  onMouseOut,
  category,
}) => {
  let navigate = useNavigate();
  const handleRefreshClick = () => {
    // Reload the web page
    window.location.reload();
  };

  return (
    <>
      <div
        className={`hoverable-list pt-2 ${isActive ? "active-category" : ""}`}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <p
          className="main-cate-fnt-sz"
          onClick={() => {
            navigate(`/c/${category}`)
            handleRefreshClick()
          }}
        >
          {category}
        </p>
        {count > 0 && <NavigateNextIcon className="" />}
      </div>
    </>
  );
};

const SubcategoryBox = () => {
  return (
    <>
      <p className="subcate-fnt-sz">Submenu Item</p>
    </>
  );
};

const SubcategoryList = (props) => {
  let navigate = useNavigate();
  const handleRefreshClick = () => {
    // Reload the web page
    window.location.reload();
  };
  return (
    <>
      <div
        className="subcate-fnt-sz d-flex justify-content-between px-2 pt-2 sub-cat-cat "
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <p
          onClick={() => {
            navigate(`/c/${props.subcategory}`)
            handleRefreshClick()
          }}
          className="main-cate-fnt-sz"
        >
          {props.subcategory}
        </p>
        {props.sbcount > 0 && <NavigateNextIcon className="" />}
      </div>

      {/* <div className="d-flex">
          <p>hello</p>
          <NavigateNextIcon className="" />
        </div> */}
    </>
  );
};

const EditorPick = () => {
  return (
    <>
      <div className="col">
        <div className="edtr-box-vw">
          <div className="editor-pickimg">
            <img src={editorimg} alt="EditorPick" className="editor-img" />
          </div>

          <p className="subcate-fnt-sz mt-2">Editor's Pick</p>
          <p className="cate-hd-fntsz" style={{ marginTop: "-13px" }}>
            Jewellery Shop
          </p>
        </div>
      </div>
    </>
  );
};

const SubsubMainCategory = () => {
  return <></>;
};
