import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPerson,
  faCalendarDays,
  faCampground,
  faBook,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newSearch } from "../../Redux/Actions/DateActions";

const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false);
  const [keyword, setKeyword] = useState();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  const dispatch = useDispatch();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 1);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: endDate,
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword && keyword.trim()) {
      dispatch(newSearch({date,options}));
      navigate(`/search/${keyword}`);
    } else {
      dispatch(newSearch({date,options}));
      navigate("/raftboat");
    }
  };

  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>ການເຂົ້າພັກ</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBook} />
            <span>ບໍລິການການຈອງ</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCampground} />
            <span>ສະຖານທີ່ທ່ອງທ່ຽວ</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faExpand} />
            <span>ປະສົບການທີ່ແປກໃໝ່</span>
          </div>
        </div>

        { type !== "list" &&
          <>
            <h1 className="headerTitle">
              ຄົ້ນຫາເຮືອນແພ
            </h1>
            <p className="headerDesc">
              ທາງເຮືອນແພເຮົາມີໂປຣໂມຊັນທ່ານໃດທີ່ຈອງໃນທຸກໆວັນຈັນ-ສຸກທາງເຮົາມີໂປຣຫຼູດລາຄາໃຫ້ 20%
            </p>
            { userInfo ? (
              <div className="profile">
                <Link to='#' className="item-profile1">
                ຍິນດີຕ້ອນຮັບທ່ານ {userInfo.name} ເຂົ້າສູ່ເວັບໄຊຈອງເຮືອນແພຂອງທາງເຮົາ
                </Link>
              </div>
            ) : ( <Link to="/login" className="headerBtn">ເຂົ້າສູ່ລະບົບ / ສະໝັກສະມາຊິກ</Link> ) }
            
            <div className="ffa9856b86 headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="ຄົ້ນຫາເຮືອນແພ"
                  className="headerSearchInput"
                  onChange={e=>setKeyword(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} ຫາ ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} ຈຳນວນຄົນ - ${options.room} ເຮືອນແພ `}</span>
                {openOptions && (
                  <div className="options">
                    <div className="OptionItem">
                      <span className="optionText">ຜູ້ໃຫຍ່</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* <div className="OptionItem">
                      <span className="optionText">ເດັກນ້ອຍ</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div> */}
                    <div className="OptionItem">
                      <span className="optionText">ເຮືອແພ</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem1">
                <button className="headerSearchItem1" onClick={submitHandler}>ຄົ້ນຫາ</button>
              </div>
            </div>{" "}
          </>
        }

      </div>
    </div>
  );
};

export default Header;
