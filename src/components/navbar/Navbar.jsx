import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <span className="logo">ເຮືອນແພ</span>
          </Link>
          <div className="navItems">
            {userInfo ? (
              <div className="profile">
                <Link to="/bookingDetails" className="item-profile">
                  {userInfo.name}
                </Link>
                <Link to="#" className="item-profile" onClick={logoutHandler}>
                  ອອກຈາກລະບົບ
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="navButton">
                  ເຂົ້າສູ່ລະບົບ
                </Link>
                <Link to="/register" className="navButton">
                  ສະໝັກສະມາຊິກ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
