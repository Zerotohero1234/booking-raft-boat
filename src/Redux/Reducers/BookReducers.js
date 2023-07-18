import {
  BOOK_CANCELED_FAIL,
  BOOK_CANCELED_REQUEST,
  BOOK_CANCELED_RESET,
  BOOK_CANCELED_SUCCESS,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_RESET,
  BOOK_CREATE_SUCCESS,
  BOOK_LIST_MY_FAIL,
  BOOK_LIST_MY_REQUEST,
  BOOK_LIST_MY_RESET,
  BOOK_LIST_MY_SUCCESS,
} from "../Constants/BookContants";

// CREATE BOOK
export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };
    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// USER BOOK
export const bookListMyReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_MY_REQUEST:
      return { loading: true };
    case BOOK_LIST_MY_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_LIST_MY_RESET:
      return { books: [] };
    default:
      return state;
  }
};

// BOOK CANCELED BY USER
export const bookCanceledReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CANCELED_REQUEST:
      return { loading: true };
    case BOOK_CANCELED_SUCCESS:
      return { loading: false, success: true };
    case BOOK_CANCELED_FAIL:
      return { loading: false, error: action.payload };
    case BOOK_CANCELED_RESET:
      return {};
    default:
      return state;
  }
};