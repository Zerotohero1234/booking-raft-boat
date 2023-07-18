import { useDispatch, useSelector } from "react-redux";
import "./FeaturedProperties.css";
import { listRoomFeatured } from "../../Redux/Actions/RoomActions";
import { useEffect, useRef, useState } from "react";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const [width, setWidth] = useState(0);
  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const gap = 14;
  const { rooms, loading, error } = useSelector(
    (state) => state.roomFeaturedList
  );

  console.log(rooms);

  const handlePrevClick = () => {
    carouselRef.current.scrollBy(-(width + gap), 0); // change to -(width + gap)
  };

  const handleNextClick = () => {
    carouselRef.current.scrollBy(width + gap, 0); // change to width + gap
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
    dispatch(listRoomFeatured());
  }, [dispatch]);

  return (
    <div className="fp">
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
          {rooms &&
            rooms.map((room) => (
              <>
                {/* <Link to={`/raftBoat/${room._id}`}> */}
                <div className="fpItem" key={room._id}>
                <Link to={`/raftBoat/${room._id}`}>
                  <img src={room.image[0]} alt="" className="fpImg" />
                  <span className="pListTitles">{room.name}</span>
                  <span className="fpPrice">
                    <NumericFormat
                      value={room.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₭ "}
                    />
                  </span>
                  </Link>
                </div>
                {/* </Link> */}
              </>
            ))}
        </>
      )}
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

export default FeaturedProperties;
