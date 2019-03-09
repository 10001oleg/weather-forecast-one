import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchWeather } from "../../actions";
import CurrentWeather from "../../components/currentWeather";
import "./Weather.css";

class Weather extends Component {
  componentDidMount() {
    this.props.fetchWeather();
  }

  renderLoading = () => {
    return <div className="container center">Loading...</div>;
  };

  renderWeather = () => {
    const { city, data } = this.props;
    return (
      <div className="container center">
        <h1>{city}</h1>
        <CurrentWeather data={data} />
      </div>
    );
  };

  shouldRenderWeather = () => {
    if (this.props.isFetching || !this.props.data) {
      return this.renderLoading();
    } else {
      return this.renderWeather();
    }
  };

  render() {
    return this.shouldRenderWeather();
  }
}

const mapStateToProps = state => {
  return {
    isFetching: state.weather.isFetching,
    data: state.weather.data,
    city: state.weather.city
  };
};

Weather.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.object,
  city: PropTypes.string
};

export default connect(
  mapStateToProps,
  { fetchWeather }
)(Weather);
