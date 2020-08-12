import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View } from "react-native";

import Navigator from "../config/routes";

import { getDeviceLocData } from "../redux/actions";
// import { FeedContainer } from "./FeedContainer";

//TEMP DISABLE WARNINGS
console.disableYellowBox = true;

class AppContainer extends Component {
  componentDidMount() {
    this.props.getDeviceLocData();
  }

  render() {
    return <Navigator />;
  }
}

// const mapStateToProps = state => {
//   return {
//     // latitude: state.deviceLocReducer.deviceLocData.latitude,
//     // longitude: state.deviceLocReducer.deviceLocData.longitude,
//     region: state.deviceLocReducer.region
//   };
// };

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getDeviceLocData }, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);
