import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
