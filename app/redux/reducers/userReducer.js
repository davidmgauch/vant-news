// import { RECEIVE_FEED_DATA } from "../actions";
import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_USER_DATA:
      return {
        ...state,
        // userData: {
        //   data: action.userData.results,
        //   firstName: action.userData.results[0].name.first,
        //   lastName: action.userData.results[0].name.last,
        //   image: action.userData.results[0].picture.medium
        // }
        userData: action.userData.results,
        firstName: action.userData.results[0].name.first,
        lastName: action.userData.results[0].name.last,
        image: action.userData.results[0].picture.large
      };
    default:
      return state;
  }
};

// export default (state = {}, action) => {
//   switch (action.type) {
//     case types.GET_DEVICE_LOC_DATA:
//       return {
//         ...state,
//         region: {
//           latitude: action.payload.coords.latitude,
//           longitude: action.payload.coords.longitude,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA
//         }
//       };
//     case types.GET_DEVICE_GEOCODE_DATA:
//       return { ...state, geoCodeData: action.payload };
//     default:
//       return state;
//   }
// };
