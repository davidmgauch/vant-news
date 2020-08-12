import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform
} from "react-native";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    {/* <StatusBar translucent backgroundColor={backgroundColor} {...props} /> */}
  </View>
);

class StatusBarDark extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyStatusBar backgroundColor="#5E8D48" barStyle="dark-content" />
        {/* <View style={styles.appBar} /> */}
        {/* <View style={styles.content} /> */}
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "#33373B"
    // flex: 1
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "#33373B"
  },
  // appBar: {
  //   backgroundColor: "#79B45D",
  //   height: APPBAR_HEIGHT
  // },
  content: {
    // flex: 1,
    // backgroundColor: "#33373B"
  }
});

export default StatusBarDark;
