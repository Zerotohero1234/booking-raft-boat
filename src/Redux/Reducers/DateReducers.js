
const INITIAL_STATE = {
    dates: [],
    options: {
      adult: undefined,
      children: undefined,
      room: undefined,
    },
};

export const searchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case "NEW_SEARCH":
        return action.payload;
      case "RESET_SEARCH":
        return INITIAL_STATE;
      default:
        return state;
    }
  };