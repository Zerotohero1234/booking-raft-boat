import "./SearchItem.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listRoom } from "../../Redux/Actions/RoomActions";
import Loading from "../loadingError/Loading";
import Message from "../loadingError/Error";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import Pagination from "react-js-pagination";

import { Link } from "react-router-dom"
import { format } from "date-fns";
import { newSearch } from "../../Redux/Actions/DateActions";

const SearchItem = (props) => {
  let {keyword1,pagenumber,category,dates1,options1} = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  // const [dates2, setDate] = useState([
  //   {
  //     startDate: format(new Date(dates1[0].startDate), 'MM/dd/yyyy'),
  //     endDate: format(new Date(dates1[0].endDate), 'MM/dd/yyyy'),
  //     key: "selection",
  //   },
  // ]);

  const [date, setDate] = useState([
    {
      startDate: new Date(dates1[0].startDate),
      endDate: new Date(dates1[0].endDate),
      key: "selection",
    },
  ]);
  
  const [options, setOptions] = useState(
    location.state?.options1 || {
      adult: options1?.adult,
      children: options1?.children,
      room: options1?.room,
    }
  );

  const [openOptions, setOpenOptions] = useState(false);
  

  console.log("option2 ==",options);

  const {
    rooms,
    loading,
    error,
    roomsCount,
    resultPerPage,
    filteredRoomsCount,
  } = useSelector((state) => state.roomList);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  let count = filteredRoomsCount;

  useEffect(() => {
    dispatch(listRoom(keyword1, currentPage, category));
    console.log(category);
  }, [dispatch, keyword1, currentPage, category]);

  const submitHandler = (e) => {
    if(date && options) {
      dispatch(newSearch({date,options}));
      navigate(`/raftBoat/${e}`)
    } else {
      navigate(`/raftBoat/${e}`)
    }
  }

  useEffect(() => {
    setDate([
      {
        startDate: new Date(dates1[0].startDate),
        endDate: new Date(dates1[0].endDate),
        key: "selection",
      },
    ]);
    setOptions([
      {
        adult: options1?.adult,
      children: options1?.children,
      room: options1?.room,
      },
    ]);
  }, [dates1,options1]);

  return (
    <>
      {loading ? (
        <div className="mb-5">
          <Loading/>
        </div>
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {rooms &&
            rooms.map((room) => (
              <div className="searchItem" key={rooms._id}>
                <img src={room.image} alt={room.name} className="siImg" />
                <div className="siDesc">
                  <h1 className="siTitle">{room.name}</h1>
                  <span className="siTaxiOp">ໂປຣໂມຊັ່ນທຸກໆວັນຈັນ-ສຸກແມ່ນຫຼຸດລາຄາ 20%</span>
                  <span className="siSubtitle">
                    ມີເຄື່ອງອຳນວຍຄວາມສະດວກພາຍໃນເຮືອນແພ
                  </span>
                  <span className="siFeatures">
                    {room.desc}
                  </span>
                  <span className="siCancelOp">ສາມາດຍົກເລີກການຈອງໄດ້</span>
                  <span className="siCancelOpSubtitle">
                    ທ່ານສາມາດຍົກເລີກການຈອງໄດ້ພາຍຫຼັງ 1 ມື້ ແມ່ນເຮົາຂະສົ່ງເງິນຄືນ, ຖ້າກາຍມື້ 1 ແມ່ນເຮົາບໍ່ສາມາດສົ່ງເງິນຄືນໄດ້
                  </span>
                </div>
                <div className="siDetails">
                  <div className="siRating">
                    <span>Excellent</span>
                    <button>8.9</button>
                  </div>
                  <div className="siDetailTexts">
                    <div className="siPrice">
                      <NumericFormat
                        value={room.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₭"}
                      />
                    </div>
                    <span className="siTaxOp">ລາຄາ</span>
                    {/* <Link to={`/raftBoat/${room._id}`}> */}
                    <button onClick={() => submitHandler(room._id)}  className="siCheckButton">ກວດສອບຂໍ້ມູນເພີ່ມເຕີມ</button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}

      {/* Pagination */}

      {resultPerPage < count && (
        <div className="paginationBox" key={roomsCount}>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={count}
            onChange={setCurrentPageNo}
            nextPageText="ໜ້າຕໍ່ໄປ"
            prevPageText="ກັບໄປໜ້າເກົ່າ"
            firstPageText="1st"
            lastPageText="ສຸດທ້າຍ"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      )}
    </>
  );
};

export default SearchItem;
