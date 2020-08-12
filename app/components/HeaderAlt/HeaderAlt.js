import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import styles from "./styles";

export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;

class HeaderAlt extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Header", deviceHeight);
    return <TouchableOpacity style={{ flex: 1, backgroundColor: "purple" }} />;
  }
}

export default HeaderAlt;
