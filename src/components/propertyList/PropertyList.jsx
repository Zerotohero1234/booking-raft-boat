import { useDispatch, useSelector } from "react-redux";
import "./propertyList.css";

import { useState, useRef, useEffect } from "react";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { useNavigate } from "react-router-dom";

const PropertyList = () => {
  const [width, setWidth] = useState(80);
  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const gap = 14;

  // const images = [
  //   "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
  //   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  //   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  //   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  //   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  //   "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  // ];

  // const categoryList = useSelector((state) => state.categoryList);
  // const { categories, loading, error } = categoryList;

  const { categories, loading, error } = useSelector(
    (state) => state.categoryList
  );

  const handlePrevClick = () => {
    carouselRef.current.scrollBy(-(width + gap), 0); // change to -(width + gap)
  };

  const handleNextClick = () => {
    carouselRef.current.scrollBy(+(width + gap), 0); // change to width + gap
  };

  const handleResize = () => {
    setWidth(carouselRef.current.offsetWidth);
  };

  const handleDragStart = (e) => {
    setIsDragStart(true);
    setPrevPageX(e.pageX);
    setPrevScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleDragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    let positionDiff = e.pageX - prevPageX;
    carouselRef.current.scrollLeft = prevScrollLeft - positionDiff;
  };

  const handleDragStop = () => {
    setIsDragStart(false);
  };

  useEffect(() => {
      dispatch(listCategories());
      if (category) {
        navigate(`/type/${category}`)
      }
  },[dispatch, category]);

  return (
    <div className="pList">
      <div
        className="carousel"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragging}
        onMouseLeave={handleDragStop}
      >
        {loading ? (
          <div className="mb-5">
            <Loading />
          </div>
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
          { categories &&
            categories.map((category,i) => (
              <div className="pListItem" key={i} onClick={() => setCategory(category.name)}>
                <img
                  src={category.img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{category.name}</h1>
                </div>
              </div>
            ))}
          </>
        )}
        <div></div>
      </div>
      <div className="wrap-button-next-prev" style={{ top: "50%" }}>
        <button className="prev" onClick={handlePrevClick}>
          &#10094;
        </button>
        <button className="next" onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
