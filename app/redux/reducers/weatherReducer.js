import * as types from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case types.RECEIVE_WEATHER_DATA:
      let currentTemp = Math.round(action.weatherData.main.temp);
      let iconId = action.weatherData.weather[0].icon;
      let iconUrl = "http://openweathermap.org/img/w/" + iconId + ".png";
      return {
        ...state,
        weatherData: action.weatherData,
        currentWeather: currentTemp,
        currentWeatherIcon: iconUrl,
        currentCity: action.weatherData.name
      };
    default:
      return state;
  }
};

//
