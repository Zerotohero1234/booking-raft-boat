import * as React from 'react'
import "./register.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Redux/Actions/userActions';
import Message from '../../components/loadingError/Error';
import Loading from '../../components/loadingError/Loading';

function Register() {
  window.scrollTo(0, 0);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [tel, setTel] = React.useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  React.useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, tel, password));
  };


  return (
    <>
        <section className="login-container">
        <form className="form" onSubmit={submitHandler}>
          <p className="form-title">ສະໝັກສະມາຊິກ</p>
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading/>}
          <div className="input-container">
            <input type="text" placeholder="ຊື່ຜູ້ໃຊ້" value={name} onChange={(e) => setName(e.target.value)}/>
            <span></span>
          </div>
          <div className="input-container">
            <input type="email" placeholder="ອີ່ເມວ" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span></span>
          </div>
          <div className="input-container">
            <input type="tel" placeholder="ເບີໂທລະສັບ" value={tel} onChange={(e) => setTel(e.target.value)} />
            <span></span>
          </div>
          <div className="input-container">
            <input type="password" placeholder="ລະຫັດຜ່ານ" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="button-login">
            <button type="submit" className="submit">
              ສະໝັກສະມາຊິກ
            </button>
          </div>

          <p className="signup-link">
            ຂ້າພະເຈົ້າໄດ້ສະໝັກເປັນສະມາຊິກແລ້ວ &nbsp;
            <Link to="/login">ກົດເພື່ອໄປທີ່ໜ້າເຂົ້າສູ່ລະບົບ</Link>
          </p>
        </form>
      </section>
    </>
  )
}

export default Register