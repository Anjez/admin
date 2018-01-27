import FireBaseTools from "./../api/firebase";
import {
  REGISTER_USER,
  LOGIN_USER,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER,
  LOGOUT_USER
} from "./types";

export function registerUser(data) {
  return {
    type: REGISTER_USER,
    data: data
  };
}

export function loginUser(email, password) {
  return {
    type: LOGIN_USER,
    email: email,
    password: password
  };
}

export function fetchUser() {
  return {
    type: FETCH_FIREBASE_USER
  };
}

export function changePassword(newPassword) {
  return {
    type: CHANGE_FIREBASE_USER_PASSWORD,
    password: newPassword
  };
}

export function resetPasswordEmail(email) {
  return {
    type: FIREBASE_PASSWORD_RESET_EMAIL,
    email: email
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export function getInfo(collection) {
    return {
        type: GET_USER_INFO,
        data: collection
    }
}
