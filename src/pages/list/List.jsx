import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const List = () => {
  window.scrollTo(0, 0);
  const params = useParams();
  const keyword1 = params.keyword;
  const pagenumber = params.pagenumber;
  const category = params.category;

  const { date, options } = useSelector((state) => state.searchData);
  const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destination);

  // const startDate =
  //   date && date.length > 0 ? parseISO(date[0].startDate) : new Date();
  // const endDate =
  //   date && date.length > 0 ? parseISO(date[0].endDate) : new Date();
  // const startDate =
  //   date && date.length > 0 && isValid(parseISO(date[0].startDate))
  //     ? parseISO(date[0].startDate)
  //     : new Date(date[0].startDate);
  // const endDate =
  //   date && date.length > 0 && isValid(parseISO(date[0].endDate))
  //     ? parseISO(date[0].endDate)
  //     : new Date(date[0].endDate);

  // console.log(startDate);
  // console.log(endDate);
  // const [dates1, setDate] = useState(location.state?.date || [{ startDate: dateStart, endDate: dateEnd }]);

  const [openDate, setOpenDate] = useState(false);

  const [options1, setOptions] = useState(
    location.state?.options || {
      adult: options?.adult,
      children: options?.children,
      room: options?.room,
    }
  );

  // console.log(dateStart.toLocaleDateString("en-US", {
  //   month: "2-digit",
  //   day: "2-digit",
  //   year: "2-digit",
  // }));
  // console.log(dateEnd.toLocaleDateString("en-US", {
  //   month: "2-digit",
  //   day: "2-digit",
  //   year: "2-digit",
  // }));

  const [keyword, setKeyword] = useState();
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  const [dates1, setDate] = useState([
    {
      startDate: new Date(date[0].startDate),
      endDate: new Date(date[0].endDate),
      key: "selection",
    },
  ]);

  console.log("dates1", dates1);

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <form className="listSearch" onSubmit={submitHandler}>
            <h1 className="lsTitle">ຄົ້ນຫາ</h1>
            <div className="lsItem">
              <label>ຊື່ເຮືອນແພ</label>
              <input
                placeholder="ຄົ້ນຫາ"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>ມື້ເຊັກອິນເຂົ້າພັກວັນທີ່</label>
              {/* <span onClick={() => setOpenDate(!openDate)}>
                {`${format(dates1[0].startDate, "MM/dd/yyyy")} ຫາ ${format(
                  dates1[0].endDate,
                  "MM/dd/yyyy"
                )}`}
              </span> */}
              {/* <span onClick={() => setOpenDate(!openDate)}>
  {dates1 && dates1.length > 0 && `${format(dates1[0].startDate, "MM/dd/yyyy")} ຫາ ${format(dates1[0].endDate, "MM/dd/yyyy")}`}
</span> */}
              {date && options ? (
                <span onClick={() => setOpenDate(!openDate)}>
                  {`${format(dates1[0].startDate, "MM/dd/yyyy")} ຫາ ${format(
                    dates1[0].endDate,
                    "MM/dd/yyyy"
                  )}`}
                </span>
              ) : (
                <span>Loading date range...</span>
              )}
              {openDate && (
                <DateRange
                  // onChange={(item) => setDate([item.selection])}
                  onChange={(item) => {
                    setDate([item.selection]);
                  }}
                  minDate={new Date()}
                  ranges={dates1}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">ຈຳນວນຄົນ</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options1.adult}
                    onChange={(e) =>
                      setOptions({
                        adult: e.target.value,
                        children: options1?.children,
                        room: options1?.room,
                      })
                    }
                  />
                </div>
                {/* <div className="lsOptionItem">
                  <span className="lsOptionText">ເດັກນ້ອຍ</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options1.children}
                    onChange={(e) => setOptions({ adult: options1?.adult,
                      children: e.target.value,
                      room: options1?.room, })}
                  />
                </div> */}
                <div className="lsOptionItem">
                  <span className="lsOptionText">ເຮືອນແພ</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options1.room}
                    onChange={(e) =>
                      setOptions({
                        adult: options1?.adult,
                        children: options1?.children,
                        room: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button type="submit">ຄົ້ນຫາ</button>
          </form>
          <div className="listResult">
            <SearchItem
              keyword1={keyword1}
              pagenumber={pagenumber}
              category={category}
              dates1={dates1}
              options1={options1}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
