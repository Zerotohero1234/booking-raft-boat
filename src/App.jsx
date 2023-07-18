import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./pages/home/Home"
import List from "./pages/list/List"
import Raftboat from "./pages/raftboat/Raftboat"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import BookingDetail from "./pages/bookDetails/bookingDetail"
import PrivateRouter from "./PrivateRouter"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/raftBoat" element={<List/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/search/:keyword" element={<List/>}/>
        <Route path="/page/:pagenumber" element={<List/>}/>
        <Route path="/type/:category" element={<List/>}/>
        <Route path="/raftBoat/:id" element={<Raftboat/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>

        <Route element={<PrivateRouter />}>
          <Route path="/bookingDetails" element={<BookingDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
