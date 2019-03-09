import * as types from "./actionTypes";
import axios from "axios";
import config from "../helpers/config.json";

const sholdFetchData = cacheTime => {
  const source = localStorage.getItem("weather");

  if (!source) {
    return null;
  }

  const { timestamp, data } = JSON.parse(source);
  const checkTimestamp = Date.now() - timestamp > cacheTime * 60000;

  if (checkTimestamp) {
    return null;
  }
  return data;
};

export const fetchWeather = () => dispatch => {
  dispatch(requestWeather());
  const data = sholdFetchData(60);

  if (data) {
    return dispatch(receiveWeather(data));
  }

  navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${
      config.key
    }&units=imperial`;

    axios
      .get(URL)
      .then(res => {
        dispatch(receiveWeather(res.data));
        localStorage.setItem(
          "weather",
          JSON.stringify({ timestamp: Date.now(), data: res.data })
        );
      })
      .catch(error => {
        console.error(error);
        alert("Unable to retrieve weather data. Please refresh.");
      });
  });
};

const requestWeather = () => {
  return {
    type: types.REQUEST_WEATHER
  };
};

const receiveWeather = payload => {
  return {
    type: types.RECEIVE_WEATHER,
    payload
  };
};
