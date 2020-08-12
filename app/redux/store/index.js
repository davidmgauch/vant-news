import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
// import { apiMiddleware } from "redux-api-middleware";
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";
import thunk from "redux-thunk";

import reducer from "../reducers";
import rootSaga from "../sagas/sagas";

//Special promise middleware to GetDeviceLocation
function promiseMiddleware({ dispatch }) {
  function isPromise(val) {
    return val && typeof val.then === "function";
  }

  return next => action => {
    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => dispatch({ ...action, payload: error, error: true })
        )
      : next(action);
  };
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const NavMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
export const addListener = createReduxBoundAddListener("root");

const middleware = [sagaMiddleware, promiseMiddleware, thunk, NavMiddleware];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

// mount it on the Store
const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
