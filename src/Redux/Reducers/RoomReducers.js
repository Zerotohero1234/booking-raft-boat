import {
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_FEATURED_LIST_FAIL,
  ROOM_FEATURED_LIST_REQUEST,
  ROOM_FEATURED_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
} from "../Constants/RoomConstants";

// ROOM LIST
export const roomListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { loading: true, rooms: [] };
    case ROOM_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.rooms,
        roomsCount: action.payload.roomsCount,
        resultPerPage: action.payload.resultPerPage,
        filteredRoomsCount: action.payload.filteredRoomsCount,
      };
    case ROOM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ROOM FEATURED LIST
export const roomFeaturedListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_FEATURED_LIST_REQUEST:
      return { loading: true, rooms: [] };
    case ROOM_FEATURED_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.rooms,
      };
    case ROOM_FEATURED_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// SINGLE ROOM
export const roomDetailsReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ROOM_DETAILS_SUCCESS:
      return { loading: false, room: action.payload };
    case ROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
