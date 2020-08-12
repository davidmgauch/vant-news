import React, { Component } from "react";
import { connect } from "react-redux";
import Navigator from "../config/routes";
import { addNavigationHelpers } from "react-navigation";
import { addListener } from "../redux/store";

class AppNavigator extends Component {
  render() {
    // console.log("AppNavigator", addListener);
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        })}
        onNavigationStateChange={null}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppNavigator);
