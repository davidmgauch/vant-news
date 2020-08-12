import { combineReducers } from "redux";
// import { locationReducer as location } from "redux-saga-location";

import feedReducer from "./feedReducer";
import deviceLocReducer from "./deviceLocReducer";
import nav from "./nav";
import userReducer from "./userReducer";
import weatherReducer from "./weatherReducer"

export default combineReducers({
  feedReducer,
  deviceLocReducer,
  nav,
  userReducer,
  weatherReducer
});
