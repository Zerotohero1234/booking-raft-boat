import axios from "axios";
import {
  ROOM_LIST_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_FEATURED_LIST_FAIL,
  ROOM_FEATURED_LIST_REQUEST,
  ROOM_FEATURED_LIST_SUCCESS,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_SUCCESS,
} from "../Constants/RoomConstants";

axios.defaults.baseURL = "https://server-booking-raft-boat.onrender.com";

// ROOM LIST
export const listRoom =
  (keyword = " ", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST });

      let link = `/api/rooms?keyword=${keyword}?&page=${currentPage}`;

      if (category) {
        link = `/api/rooms?keyword=${keyword}?&page=${currentPage}&type=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch({ type: ROOM_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ROOM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE ROOM
export const listRoomDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/rooms/${id}`);
    dispatch({ type: ROOM_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
}

// ROOM Featured LIST
export const listRoomFeatured =
  () =>
  async (dispatch) => {
    try {
      dispatch({ type: ROOM_FEATURED_LIST_REQUEST });

      let link = `/api/rooms/get/featured?featured=true`;

      const { data } = await axios.get(link);
      dispatch({ type: ROOM_FEATURED_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ROOM_FEATURED_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };