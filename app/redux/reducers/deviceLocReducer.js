import { Dimensions } from "react-native";
import * as types from "../actions/types";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

const INIT_STATE = {
  region: {}
};
export default (state = {}, action) => {
  switch (action.type) {
    case types.REQUEST_WEATHER_DATA:
      return {
        ...state,
        region: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        coordinates: {
          latitude: action.payload.coords.latitude,
          longitude: action.payload.coords.longitude
        },
        deviceLocation: action.payload.coords
      };
    case types.GET_DEVICE_GEOCODE_DATA:
      return { ...state, geoCodeData: action.payload };
    default:
      return state;
  }
};
