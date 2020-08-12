import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Provider, connect } from "react-redux";
import Navigator from "./config/routes";
import { addNavigationHelpers } from "react-navigation";

// import * as ReactNavigation from "react-navigation";

import store from "./redux/store";
import AppContainer from "./containers/AppContainer";
// import FeedContainer from "./containers/FeedContainer";
import AppNavigator from "./containers/AppNavigator";
import { StatusBarCustom } from "./components/StatusBarCustom";

EStyleSheet.build({
  $primaryBrandColor: "#081c2f",
  $primaryTextWhite: "#FFFFFF",
  $primaryTextBlack: "#222222",
  $primaryTextGrey: "#808080",
  $secondaryBrandColor: "#a00b0b",
  // $tabBarHeight: 44,

  "@media ios": {
    $globalFontFamily: "",
    $primaryFontWeightThin: "500",
    $primaryFontWeightMedium: "600",
    $primaryFontWeightMediumAlt: "600",
    $primaryFontWeightThick: "800",
    $headerHeight: 60,
    $marginBottom: 0,
    $overlayNegativeMarginTop: -15
  },
  "@media android": {
    $globalFontFamily: "Roboto",
    $primaryFontWeightThin: "300",
    $primaryFontWeightMedium: "400",
    $primaryFontWeightMediumAlt: "500",
    $primaryFontWeightThick: "900",
    $headerHeight: 45,
    $marginBottom: 24,
    $overlayNegativeMarginTop: 0
  }
});

// const App = ({ dispatch, nav }) => (
//   <Navigator
//     navigation={addNavigationHelpers({
//       dispatch: this.props.dispatch,
//       state: this.props.nav,
//       addListener
//     })}
//   />
// );

// const mapStateToProps = state => {
//   return {
//     nav: state.nav
//   };
// };

// const AppNavigator = connect(mapStateToProps)(App);

export default () => (
  <View style={styles.container}>
    <Provider store={store}>
      <Navigator onNavigationStateChange={null} />
    </Provider>
    {/* <StatusBarCustom color="#484A80" textColor={"light-content"} /> */}
    <StatusBar
      backgroundColor={EStyleSheet.value("$primaryBrandColor")}
      barStyle={"light-content"}
    />
  </View>
);

const styles = EStyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "black"
    // position: "absolute",
    // marginBottom: 300
  }
});
