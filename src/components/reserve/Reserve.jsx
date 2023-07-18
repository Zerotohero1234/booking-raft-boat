import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import imgQr from "../../../public/Capture.png";
import { NumericFormat } from "react-number-format";
import { createBook } from "../../Redux/Actions/BookAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../loadingError/Error";
import Loading from "../loadingError/Loading";
import { BOOK_CREATE_RESET } from "../../Redux/Constants/BookContants";
import axios from "axios";

function Reserve({
  setOpen,
  isWeekday,
  roomPrice,
  days,
  boat,
  discount,
  person,
  formattedStartDate,
  formattedEndDate,
  numberOfRooms,
  room,
  price,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deposit, setDeposit] = useState();
  const [file, setFile] = useState("");

  const bookCreate = useSelector((state) => state.bookCreate);
  const { book, success, error, loading } = bookCreate;

  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch({ type: BOOK_CREATE_RESET });
    }
  }, [navigate, success]);

  const bookingHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqficij3m/image/upload",
        data
      );

      const { url } = uploadRes.data;
      dispatch(
        createBook({
          checkInDate: formattedStartDate,
          checkOutDate: formattedEndDate,
          qtyRoom: numberOfRooms,
          bookItems: [
            {
              name: room.name,
              qty: boat,
              image: room.image[0],
              price: price,
              deposit: deposit,
              qtyPerson: person,
              room: room._id,
            },
          ],
          moneySlip: url,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDeposit(
      isWeekday
        ? Math.floor(days * roomPrice * boat * 0.2)
        : Math.floor(days * roomPrice * boat * 0.2 * (1 - discount / 100))
    );
  }, [roomPrice, days, deposit]);

  return (
    // <div className="reserver">
    //   <div className="rContainer">
    //     <FontAwesomeIcon
    //       icon={faCircleXmark}
    //       className="rClose"
    //       onClick={() => setOpen(false)}
    //     />
    //     <span>Select your rooms:</span>

    //     {/* <div className="rItem">
    //         <div className="rItemInfo">
    //             <div className="rTitle">title</div>
    //             <div className="rDesc">Desc</div>
    //             <div className="rMax">
    //                 Max people: <b>{room.maxPeople}</b>
    //             </div>
    //             <div className="rPice">{room.price}</div>
    //         </div>
    //         <div className="rSelectRooms">

    //             {room.numberOfRooms.map((roomNumber) => (
    //                 <div className="room" key={roomNumber._id}>
    //                 <label>{roomNumber.number}</label>
    //                 <input value={roomNumber._id} type="checkbox" />
    //             </div>
    //             ))}

    //         </div>
    //     </div> */}
    //     <button className="rButton">
    //         Reserver Now!
    //     </button>
    //   </div>
    // </div>
    <div className="reserver">
      <form className="formModalReservation">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        {loading && <Loading/>}
        {error && <Message variant="alert-danger">{error}</Message>}
        <p className="form-title">ໂອນເງິນມັດຈຳກ່ອນ 20%</p>
          {isWeekday ? (
            <p className="form-title">
              ເປັນ{" "}
              <NumericFormat
                value={Math.floor(days * roomPrice * boat * 0.2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₭ "}
              />{" "}
              ກີບ
            </p>
          ) : (
            <p className="form-title">
              ເປັນ{" "}
              <NumericFormat
                value={Math.floor(
                  days * roomPrice * boat * 0.2 * (1 - discount / 100)
                )}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₭ "}
              />{" "}
              ກີບ
            </p>
          )}
<div className="ContainerWrapItemImg">
<div className="wrapMoneyImg">
          <p className="form-title">ສະແກນ QR CODE ເພື່ອຈ່າຍເງິນ</p>
          <div className="input-container">
            <img className="imgQr" src={imgQr} alt="" />
          </div>
        </div>

        <div className="wrapMoneyImg">
          <p className="form-title">ສົ່ງຮູບໂອນເງິນມັດຈຳເປັນຫຼັກຖານຢືນຢັນ</p>
          <div
            className="form-title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="file" style={{ cursor:"pointer" }}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                width="100px"
                height="100px"
              />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </div>
        </div>
</div>

        <button type="submit" className="submit" onClick={bookingHandler}>
          ກົດເພື່ອຈອງ
        </button>
      </form>
    </div>
  );
}

export default Reserve;
