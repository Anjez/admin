import {FAILURE} from "./../actions/types";

const initialState = {
  error: false,
  success: false,
  message: ''
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FAILURE:
      return { ...state, message: action.message, error: true, success: false };
    default:
      return state;
  }
}
