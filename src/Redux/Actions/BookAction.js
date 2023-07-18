import axios from "axios";
import { BOOK_CANCELED_FAIL, BOOK_CANCELED_REQUEST, BOOK_CANCELED_SUCCESS, BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_LIST_MY_FAIL, BOOK_LIST_MY_REQUEST, BOOK_LIST_MY_SUCCESS } from "../Constants/BookContants";
import { logout } from "./userActions";
// CREATE BOOK
export const createBook = (book) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOK_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`/api/booking`, book, config);
        dispatch({ type: BOOK_CREATE_SUCCESS, payload: data });
        
    } catch (error) {
        const message =
            error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: BOOK_CREATE_FAIL,
            payload: message,
        });
    }
};

// USER BOOK
export const listMyBook = () => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOK_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/booking/`, config);
        dispatch({ type: BOOK_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
        const message = 
            error.response && error.response.data.message
            ?   error.response.data.message
            :   error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: BOOK_LIST_MY_FAIL,
            payload: message,
        })
    }
}

//  BOOK CANCELED BY USER
export const cancelBook =
  (bookId) => async (dispatch, getState) => {
    try {
      dispatch({ type: BOOK_CANCELED_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/booking/${bookId}/cancel`,
        {},
        config
      );

      dispatch({ type: BOOK_CANCELED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: BOOK_CANCELED_FAIL,
        payload: message,
      });
    }
  };