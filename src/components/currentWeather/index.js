import React, { Component } from "react";
import PropTypes from "prop-types";
import { capitalize } from "../../helpers";
import "./currentWeather.css";

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: props.data
    };
  }

  render() {
    const { weather } = this.state;
    const temperature = Math.round(+weather.main.temp);
    const { description, icon } = weather.weather[0];
    const {
      main: { humidity },
      wind: { speed }
    } = weather;

    return (
      <div className="current-weather">
        <p>{capitalize(description)}</p>
        <h1 className="large-font">
          <span>
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt={`icon ${description}`}
            />
          </span>
          {temperature}°F
        </h1>
        <p>Humidity: {humidity}</p>
        <p>Wind: {speed}</p>
      </div>
    );
  }
}

CurrentWeather.propTypes = {
  data: PropTypes.object.isRequired
};

export default CurrentWeather;
