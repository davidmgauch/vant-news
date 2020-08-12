import PropTypes from "prop-types";
import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  Text,
  ListView,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import SplashScreen from "react-native-splash-screen";

import {
  requestFeedData,
  getDeviceLocData,
  requestUserData,
  requestWeatherData
} from "../redux/actions";
// import { fetchDeviceLoc } from "../redux/api/deviceLocation";
import { Header } from "../components/Header";
import { FeedList } from "../components/FeedList";

const styles = EStyleSheet.create({
  container: {
    flex: 1
  }
});

class FeedContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      test_data: false,
      zip_code: 90034
      // device_lat: 34.024818
      // device_coordinates: deviceCoordinates
    };
  }
  componentDidMount() {
    //TEMP DISABLED - READD LATER ONCE ANDROID IS GOOD
    // if (Platform.OS === "ios") {
    //   SplashScreen.hide();
    // }
    SplashScreen.hide();

    this.props.getDeviceLocData();
    this.props.requestUserData();
    // if (this.props.deviceLocation) {
    //   this.props.requestFeedData(
    //     this.state.page,
    //     this.state.test_data,
    //     this.props.deviceLocation
    //   );
    // }
    // initData();
    // this.props.requestWeatherData(this.state.device_lat);
  }

  componentDidUpdate() {
    // initData();
    if (this.props.deviceLocation && !this.props.feedData) {
      this.props.requestFeedData(
        this.state.page,
        this.state.test_data,
        this.props.deviceLocation
      );
    }
  }

  // initData() {
  //   if (this.props.deviceLocation) {
  //     this.props.requestFeedData(
  //       this.state.page,
  //       this.state.test_data,
  //       this.props.deviceLocation
  //     );
  //   }
  // }

  render() {
    // console.log("Device Location", this.props.deviceLocation);
    // console.log("FeedContainer Weather Data", this.props.currentWeather);
    return (
      <View style={styles.container}>
        <FeedList navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceLocation: state.deviceLocReducer.deviceLocation,
    feedData: state.feedReducer.feedData,
    userData: state.userReducer.userData,
    currentWeather: state.weatherReducer.weatherData
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestFeedData, getDeviceLocData, requestUserData, requestWeatherData },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedContainer);
