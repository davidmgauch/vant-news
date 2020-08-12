import * as types from "./types";
import Geocoder from "react-native-geocoder";

export const requestFeedData = (page, test_data, location) => ({
  type: types.REQUEST_FEED_DATA,
  page,
  test_data,
  location
});
export const receiveFeedData = (feedData, page, test_data) => ({
  type: types.RECEIVE_FEED_DATA,
  feedData,
  page,
  test_data
});

export const getDeviceLocData = () => {
  // console.log("get Location Dispatched");
  return dispatch => {
    navigator.geolocation.getCurrentPosition(
      position => {
        dispatch({
          type: types.REQUEST_WEATHER_DATA,
          payload: position
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    // requestWeatherData(payload);
  };
};

// export const getDeviceGeocodeData = geoLocaltion => {
//   // console.log("GeoCode Action", geoLocaltion);

//   const geoCodeData = new Promise((resolve, reject) => {
//     Geocoder.geocodePosition(geoLocaltion)
//       .then(res => {
//         // res is an Array of geocoding object (see below)
//         resolve(res);
//         console.log("GeoCode Response", res);
//       })
//       .catch(err => console.log(err));
//   });
//   return {
//     type: types.GET_DEVICE_GEOCODE_DATA,
//     payload: geoCodeData
//   };
// };

export const requestUserData = () => ({ type: types.REQUEST_USER_DATA });
export const receiveUserData = userData => ({
  type: types.RECEIVE_USER_DATA,
  userData
});

export const requestWeatherData = device_coords => ({
  type: types.REQUEST_WEATHER_DATA,
  device_coords
});
export const receiveWeatherData = weatherData => ({
  type: types.RECEIVE_WEATHER_DATA,
  weatherData
});
