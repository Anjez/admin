import * as type from "./../actions/types";

const initialState = {
  dataLogin: null,
  infos: null,
  dataFetched: false,
  isLogin: false,
  error: false,
  messageError: ''
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case type.LOGOUT_FIREBASE_USER:
      return { ...state, dataLogin: action.user, isLogin: false };
    case type.LOGIN_FIREBASE_USER:
      return { ...state, dataLogin: action.user, isLogin: true };
    case type.REGISTER_FIREBASE_USER:
      return { ...state, info: action.data, dataFetched: true };
    case type.UPDATE_FIREBASE_USER:
      return { ...state, info: action.data };
    case type.CHANGE_FIREBASE_USER_PASSWORD:
      return { ...state, dataLogin: action.data };
    case type.FIREBASE_PASSWORD_RESET_EMAIL:
      return { ...state, dataLogin: action.data };
    case type.FETCH_FIREBASE_USER_SUCCESS:
      return { ...state, dataLogin: action.user, isLogin: true };
    case type.FAILURE:
      return { ...state, dataLogin: action.error, error: true };
    default:
      return state;
  }
}
