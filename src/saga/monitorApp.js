import { all } from "redux-saga/effects";
import userSaga from "./userSaga";

function* monitorApp() {
  yield all([userSaga()]);
}

export default monitorApp;
