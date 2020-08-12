// import { RECEIVE_FEED_DATA } from "../actions";
import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_FEED_DATA:
      // return { ...state, feedData: action.feedData };
      // console.log("FEED REDUCER", action);
      if (action.page === 0) {
        return {
          ...state,
          feedData: action.feedData,
          feedTestData: action.test_data
        };
      } else {
        return {
          ...state,
          feedData: [...state.feedData, ...action.feedData],
          feedTestData: action.test_data
        };
      }

    default:
      return state;
  }
};
