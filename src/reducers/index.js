import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
import userReducer from "./userReducer";
import messageReducer from "./messageReducer";

const config = {
  key: "root",
  storage
};
const rootReducer = persistCombineReducers(config, {
  user: userReducer,
  message: messageReducer
});
export default rootReducer;
