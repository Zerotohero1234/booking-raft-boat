import "./raftboat.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
// import MailList from '../../components/'
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  // faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listRoomDetails } from "../../Redux/Actions/RoomActions";
import Loading from "../../components/loadingError/Loading";
import Message from "../../components/loadingError/Error";
import { NumericFormat } from "react-number-format";
import Reserve from "../../components/reserve/Reserve";

import moment from "moment";

const Raftboat = () => {
  const [slideNumber, setslideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  let params = useParams();
  const roomId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roomDetails = useSelector((state) => state.roomDetails);
  const { loading, error, room } = roomDetails;

  console.log("room",room);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { date, options } = useSelector((state) => state.searchData);

  const [person, setPerson] = useState(options[0].adult);
  const [boat, setBoat] = useState(options[0].room);

  const [startDate, setStartDate] = useState(new Date(date[0].startDate));
  const [endDate, setEndDate] = useState(new Date(date[0].endDate));

  const handleStartDateChange = (event) => {
    const date = new Date(event.target.value);
    setStartDate(date);
  };

  const handleEndDateChange = (event) => {
    const date = new Date(event.target.value);
    setEndDate(date);
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
  const formattedEndDate = moment(endDate).format("YYYY-MM-DD");

  const days = dayDifference(new Date(startDate), new Date(endDate));

  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
  //   },
  // ];

  useEffect(() => {
    dispatch(listRoomDetails(roomId));
  }, [dispatch, roomId]);

  const handleOpen = (i) => {
    setslideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }

    setslideNumber(newSlideNumber);
  };

  const handleSubmit = () => {
    if (userInfo) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  const [isWeekday, setIsWeekday] = useState(
    new Date().getDay() >= 1 && new Date().getDay() <= 5
  );
  const discount = isWeekday ? 20 : 0 ;

  const handleChangePerson = (e) => {
    const value = e.target.value;

    if(value > room.maxPeople) {
      setPerson(room.maxPeople)
    } else {
      setPerson(value)
    }
  }

  const handleChangeBoat = (e) => {
    const value = e.target.value;

    if(value > room.numberOfRooms) {
      setBoat(room.numberOfRooms)
    } else {
      setBoat(value)
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="hotelContainer">
          {/* {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )} */}

          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={room.image} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="hotelWrapper">
            <div className="hotelImages">
              {/* {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))} */}

              <h1 className="hotelTitle">{room.name}</h1>
              {/* <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Elton St 125 New york</span>
          </div> */}
              {/* <span className="hotelDistance">
            Excellent location - 500m from center
          </span> */}
              <span className="hotelPriceHighlight">
                ລາຄາ{" "}
                <NumericFormat
                  value={room.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₭ "}
                />{" "}
                ຕໍ່ຄືນ
              </span>

              <div className="hotelImgWrapper">
                <img
                  onClick={() => handleOpen(room.image)}
                  src={room.image}
                  alt=""
                  className="hotelImg"
                />
              </div>
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{room.title}</h1>
                <p className="hotelDesc">{room.desc}</p>
              </div>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsPrice">
                <div className="wrap-date">
                  <p className="reserveDate">ເລີ່ມເຂົ້າພັກວັນທີ່</p>
                  <div className="input-container">
                    <input
                      value={formattedStartDate}
                      type="date"
                      onChange={handleStartDateChange}
                      placeholder="Start Date"
                    />
                    <span></span>
                  </div>

                  <p className="reserveDate">ເຊັກເອົ້າວັນທີ່</p>
                  <div className="input-container">
                    <input
                      value={formattedEndDate}
                      type="date"
                      onChange={handleEndDateChange}
                      placeholder="End Date"
                    />
                    <span></span>
                  </div>

                  <p className="reserveDate">ຈຳນວນຄົນ</p>
                  <div className="input-container">
                    <input
                      type="number"
                      placeholder="ຈຳນວນຄົນ"
                      value={person}
                      onChange={handleChangePerson}
                      max={room.maxPeople}
                    />
                    <span></span>
                  </div>

                  <p className="reserveDate">ຈຳນວນເຮືອນແພ</p>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="ຈັກເຮືອນແພ"
                      value={boat}
                      onChange={handleChangeBoat}
                      // min="1"
                      max={room.numberOfRooms}
                    />
                    <span></span>
                  </div>
                </div>
                <h1>ຈອງຫ້ອງ {days} ມື້</h1>
                <h2>
                  <b>
                    {isWeekday ? (
                      <h2 style={{ marginTop: "10px" }}>
                        <b>
                          <p className="promotion">
                            ໂປຣໂມຊັ່ນພິເສດຫຼຸດ 20% ຖ້າຈອງວັນຈັນ ຫາ ວັນສຸກ
                          </p>
                          {/* ລາຄາ{" "} */}
                          ຈາກລາຄາ{" "}
                          <del>
                            <NumericFormat
                              value={
                                days * room.price * boat
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                            /> ກີບ
                          </del>{" "}
                          ຫລຸດ 20% ເປັນ{" "}
                          <NumericFormat
                            value={
                              Math.floor(days * room.price * boat * (1 - discount / 100))
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                          /> ກີບ
                        </b>
                      </h2>
                    ) : (
                      <h2 style={{ marginTop: "10px" }}>
                        ລາຄາ{" "}
                        <NumericFormat
                          value={Math.floor(days * room.price * boat)}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"₭ "}
                        />{" "}
                        (ຈອງ {days} ມື້)
                      </h2>
                    )}
                  </b>
                </h2>
                <button onClick={handleSubmit}>ຈອງເຮືອນແພ</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openModal && (
        <Reserve
          setOpen={setOpenModal}
          isWeekday={isWeekday}
          roomPrice={room.price}
          days={days}
          boat={boat}
          discount={discount}
          person={person}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
          numberOfRooms={room.numberOfRooms}
          room={room}
          price={isWeekday ? days * room.price * boat * (1 - discount / 100) : days * room.price * boat}
          
        />
      )}
      <Footer />
    </div>
  );
};

export default Raftboat;
