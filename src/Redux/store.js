import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { roomListReducer,roomFeaturedListReducer,roomDetailsReducer } from "./Reducers/RoomReducers";
import { categoryListReducer } from "./Reducers/CategoryReducers";
import { searchReducer } from "./Reducers/DateReducers"
import { userLoginReducer, userRegisterReducer } from "./Reducers/userReducers";
import { bookCanceledReducer, bookCreateReducer, bookListMyReducer } from "./Reducers/BookReducers";

const reducer = combineReducers({
  roomList: roomListReducer,
  roomFeaturedList: roomFeaturedListReducer,
  roomDetails: roomDetailsReducer,
  categoryList: categoryListReducer,
  searchData: searchReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  bookCreate: bookCreateReducer,
  bookListMy: bookListMyReducer,
  bookCanceled: bookCanceledReducer,
});

const searchFromLocalStorage = localStorage.getItem("searchData")
  ? JSON.parse(localStorage.getItem("searchData"))
  : {};

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  searchData: searchFromLocalStorage,
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
