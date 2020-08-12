import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import {
  receiveFeedData,
  receiveUserData,
  receiveWeatherData
} from "../actions";
import * as types from "../actions/types";
import { fetchFeedData } from "../api/feedApi";

import { fetchUserData } from "../api/userApi";
import { fetchWeatherData } from "../api/weatherApi";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getFeedData(action) {
  try {
    // do api call
    // console.log("sagas", action);
    let page = action.page;
    let test_data = action.test_data;
    let location = action.location;
    const feedData = yield call(fetchFeedData, page, test_data, location);
    yield put(receiveFeedData(feedData, page, test_data, location));
  } catch (e) {
    console.log(e);
  }
}

function* getUserData(action) {
  try {
    // do api call
    const data = yield call(fetchUserData);
    yield put(receiveUserData(data));
  } catch (e) {
    console.log(e);
  }
}

function* getWeatherData(action) {
  try {
    // do api call
    // console.log("SAGAS", action.payload.coords);
    let geoCodeData_coordinates = action.payload.coords;
    const data = yield call(fetchWeatherData, geoCodeData_coordinates);
    yield put(receiveWeatherData(data));
  } catch (e) {
    console.log(e);
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* userSaga() {
  yield [
    takeLatest(types.REQUEST_FEED_DATA, getFeedData),
    takeLatest(types.REQUEST_USER_DATA, getUserData),
    takeLatest(types.REQUEST_WEATHER_DATA, getWeatherData)
  ];
}
