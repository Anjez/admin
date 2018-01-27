import { put, call, takeEvery } from "redux-saga/effects";
import * as firebase from "../api/firebase";
import * as types from "./../actions/types";

function* registerUser(action) {
  const { email, password } = action.data;
  try {
    const userCreated = yield call(firebase.creatUser, email, password);
    const userId = userCreated.uid;
    yield call(firebase.set, "users", userId, action.data);
    const user = yield call(firebase.loginUser, email, password);
    yield put({ type: types.LOGIN_FIREBASE_USER, user });
  } catch (error) {
    yield put({ type: "FAILURE", error });
  }
}

function* login(action) {
  const { email, password } = action;
  console.log(email, password)
  try {
    const user = yield call(firebase.loginUser, email, password);
    yield put({ type: types.LOGIN_FIREBASE_USER, user });
  } catch (error) {
    yield put({ type: "FAILURE", error });
  }
}

function* fetchUserFirebase(action) {
  try {
    const user = yield call(firebase.fetchUser);
    console.log(user)
    yield put({ type: types.FETCH_FIREBASE_USER_SUCCESS, user });
  } catch (error) {
    yield put({ type: "FAILURE", error });
  }
}

function* logOut(action) {
  try {
    const user = yield call(firebase.logoutUser);
    console.log("logout saga", user)
    yield put({ type: types.LOGOUT_FIREBASE_USER, user });
  } catch (error) {
    yield put({ type: "FAILURE", error });
  }
}

export default function* userSaga() {
  yield takeEvery(types.REGISTER_USER, registerUser);
  yield takeEvery(types.FETCH_FIREBASE_USER, fetchUserFirebase);
  yield takeEvery(types.LOGIN_USER, login)
  yield takeEvery(types.LOGOUT_USER, logOut)
}
