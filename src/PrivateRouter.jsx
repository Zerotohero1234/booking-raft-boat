import { Outlet, Navigate } from "react-router-dom";

function PrivateRouter() {
    const token = window.localStorage.getItem("userInfo");
    return token ? <Outlet/> : <Navigate to="/login" />
}

export default PrivateRouter;