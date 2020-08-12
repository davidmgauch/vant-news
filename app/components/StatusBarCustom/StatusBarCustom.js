import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";

export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class StatusBarCustom extends Component {
  render() {
    const { color, textColor } = this.props;
    console.log("StatusBarCustom", color);
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor={color} barStyle={textColor} />
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: deviceWidth
    // backgroundColor: "#5E8D48"
  },
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});

// AppRegistry.registerComponent('App', () => StatusBarCustom);
export default StatusBarCustom;
