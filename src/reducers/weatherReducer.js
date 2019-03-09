import * as types from "../actions/actionTypes.js";

var initialState = {
  isFetching: false,
  data: null,
  city: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.REQUEST_WEATHER:
      return { ...state, isFetching: true };
    case types.RECEIVE_WEATHER:
      const newState = {
        ...state,
        isFetching: false,
        data: action.payload,
        city: action.payload.name
      };
      return newState;
    default:
      return state;
  }
};
