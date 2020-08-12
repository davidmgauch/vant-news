import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  Easing,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import Navigator from "../../config/routes";
import EStyleSheet from "react-native-extended-stylesheet";

import Icon from "react-native-vector-icons/Ionicons";

import styles from "./styles";
import headerCardData from "../../lib/tempHeaderCardData";
import { HeaderCardList } from "../HeaderCardList";
import { StatusBarDark } from "../StatusBarDark";
import { StatusBarCustom } from "../StatusBarCustom";

export const deviceHeight = Dimensions.get("window").height;
export const deviceWidth = Dimensions.get("window").width;
// export const { deviceWidth, deviceHeight } = Dimensions.get("window");

// const { width, height } = Dimensions.get("window");

const CustomLayoutAnimation = {
  duration: 260,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.scaleXY
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  }
};

// const Header = ({ onPress }) => (
class Header extends Component {
  constructor(props) {
    super(props);
    this.y_translate = new Animated.Value(0.01);
    this.spinValue = new Animated.Value(0);
    this.state = {
      menu_expanded: false,
      height_change: null
      // spinValue: new Animated.Value(0)
    };
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  openMenu() {
    console.log("Header, Menu Opened");
    <StatusBarCustom color={null} textColor={"dark-content"} />;

    LayoutAnimation.configureNext(CustomLayoutAnimation);
    // this.setState({ height_change: deviceHeight });
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // this.height_change.setValue(40);
    // Animated.timing(this.height_change, {
    //   toValue: deviceHeight,
    //   duration: 230,
    //   easing: Easing.easeOut,
    //   useNativeDriver: true
    // }).start();

    if (!this.state.menu_expanded) {
      console.log("openMenu");
      this.setState(
        {
          menu_expanded: true
        },
        () => {
          this.setState({
            height_change: deviceHeight
          });
          this.y_translate.setValue(0.01);
          Animated.timing(this.y_translate, {
            toValue: 1,
            duration: 260,
            easing: Easing.easeOut,
            useNativeDriver: true
          }).start();
        }
      );
      this.spinValue.setValue(0);
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true
        // easing: Easing.linear
      }).start();
    } else {
      this.setState(
        {
          menu_expanded: false
        },
        () => {
          this.setState({ height_change: EStyleSheet.value("$headerHeight") });
          this.y_translate.setValue(1);
          Animated.timing(this.y_translate, {
            toValue: 0.01,
            duration: 260,
            easing: Easing.easeOut,
            useNativeDriver: true
          }).start();
        }
      );
      this.spinValue.setValue(1);
      Animated.timing(this.spinValue, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true
        // easing: Easing.linear
      }).start();
    }
  }

  render() {
    // console.log("Header", deviceHeight);
    // const height_y = this.height_change.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 1]
    // });
    const menu_moveY = this.y_translate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, deviceHeight]
    });
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-180deg"]
    });
    return (
      <Animated.View
        style={[styles.containerOuter, { height: this.state.height_change }]}
      >
        <Animated.View
          style={[
            styles.locationModal,
            {
              transform: [{ translateY: menu_moveY }]
            }
          ]}
        >
          <HeaderCardList />
          {/* <TouchableOpacity
            onPress={() => console.log("pressed")}
            style={styles.buttonAddLocation}
          >
            <Icon name="md-add" size={32} style={styles.iconAdd} />
          </TouchableOpacity> */}
        </Animated.View>
        <TouchableWithoutFeedback onPress={() => this.openMenu()}>
          <View style={styles.containerInner}>
            <View />
            <View style={styles.titleContainer}>
              <Icon
                name="md-locate"
                size={12}
                style={{ color: "white", paddingTop: 2, paddingRight: 5 }}
              />
              <Text style={styles.text}>Current Location</Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Icon name="ios-arrow-down" size={16} style={styles.rightIcon} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

Header.propTypes = {
  onPress: PropTypes.func
};

export default Header;
