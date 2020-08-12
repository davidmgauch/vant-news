export const fetchWeatherData = async geoCodeData_coordinates => {
  const latitude = geoCodeData_coordinates.latitude;
  const longitude = geoCodeData_coordinates.longitude;
  // console.log("weatherAPI", geoCodeData_coordinates);
  try {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=imperial&APPID=202b0d41b3ef4bb89b034a3d07ee7b26"
    );
    const data = await response.json();
    // console.log("weatherAPI", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
