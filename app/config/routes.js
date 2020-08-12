import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  TouchableOpacity,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";
import {
  StackNavigator,
  TabNavigator,
  DrawerNavigator
} from "react-navigation";

// import Icon from "react-native-vector-icons/Ionicons";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";

import FeedContainer from "../containers/FeedContainer";
import ProfileContainer from "../containers/ProfileContainer";
import LocationCardsContainer from "../containers/LocationCardsContainer";
import MapContainer from "../containers/MapContainer";
import ArticleContainer from "../containers/ArticleContainer";
import MapSingleArticle from "../containers/MapSingleArticle";

import { Header } from "../components/Header";
import { HeaderAlt } from "../components/HeaderAlt";
import { ArticleHeader } from "../components/ArticleHeader";

// const MapStack = StackNavigator(
//   {
//     MapContainer: {
//       screen: MapContainer,
//       navigationOptions: ({ navigation }) => ({
//         header: () => null
//       })
//     },
//     ArticleContainer: {
//       screen: ArticleContainer,
//       navigationOptions: ({ navigation }) => ({
//         header: () => null
//       })
//     }
//   },
//   {
//     headerMode: "screen",
//     navigationOptions: {}
//   }
// );

const Tabs = TabNavigator(
  {
    FeedContainer: {
      screen: FeedContainer,
      navigationOptions: {
        tabBarLabel: "News",
        tabBarIcon: ({ tintColor }) => (
          <IconIonicons
            name="ios-paper-outline"
            size={26}
            color={tintColor}
            style={styles.tabIcons}
          />
        )
      }
    },
    MapContainer: {
      screen: MapContainer,
      navigationOptions: {
        tabBarLabel: "Map",
        tabBarIcon: ({ tintColor }) => (
          <IconIonicons
            name="ios-map-outline"
            size={27}
            color={tintColor}
            style={styles.tabIcons}
          />
        )
      }
    },
    ProfileContainer: {
      screen: ProfileContainer,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <IconIonicons
            name="ios-contact-outline"
            size={27}
            color={tintColor}
            style={styles.tabIcons}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "#081c2f",
      inactiveTintColor: "#CFD3D6",
      BackgroundColor: "#FAFAFA",
      style: {
        height: 44,
        backgroundColor: "#FAFAFA",
        justifyContent: "center",
        borderTopWidth: 0.5,
        borderTopColor: "#DADADA"
      },
      renderIndicator: () => null,
      indicatorStyle: {
        backgroundColor: "red"
      },
      labelStyle: {
        fontWeight: "500",
        paddingBottom: 3
      }
    }
  }
);

// const Maps = StackNavigator(
//   MapContainer: {
//     screen: Tabs,
//     navigationOptions: ({ navigation }) => ({
//       header: () => null
//     })
//   },
//   ArticleContainer: {
//     screen: ArticleContainer,
//     navigationOptions: ({ navigation }) => ({
//       header: () => null
//     })
//   }
// );

const FadeTransition = (index, position) => {
  const sceneRangeOpacity = [index - 1, index];
  const outputOpacity = [0, 1];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });

  return {
    opacity: transition
  };
};

const BottomTransition = (index, position, height) => {
  const sceneRange = [index - 1, index];
  const outputHeight = [height, 0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputHeight
  });

  return {
    transform: [{ translateY: transition }]
  };
};

const SideTransition = (index, position, width) => {
  const sceneRange = [index - 1, index, index + 1];
  const outputWidth = [width, 0, -width / 8];
  const sceneRangeOpacity = [index - 1, index, index + 1];
  const outputOpacity = [1, 1, 0.5];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputWidth
  });
  const transitionOpacity = position.interpolate({
    inputRange: sceneRangeOpacity,
    outputRange: outputOpacity
  });

  return {
    transform: [{ translateX: transition }],
    opacity: transitionOpacity
  };
};

const NavigationConfig = () => {
  return {
    screenInterpolator: sceneProps => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const height = sceneProps.layout.initHeight;
      const width = sceneProps.layout.initWidth;

      // return FadeTransition(index, position);
      // return BottomTransition(index, position, height);
      return SideTransition(index, position, width);
    }
  };
};

export default StackNavigator(
  {
    FeedContainer: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        header: <Header />
      })
    },
    ArticleContainer: {
      screen: ArticleContainer,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    MapContainer: {
      screen: Tabs,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
    },
    MapSingleArticle: {
      screen: MapSingleArticle,
      navigationOptions: ({ navigation }) => ({
        header: () => null
      })
      // navigationOptions: ({ navigation }) => ({
      //   headerStyle: {
      //     backgroundColor: "rgba(0,0,0,0)",
      //     paddingRight: 18,
      //     paddingLeft: 18,
      //     height: 45
      //   },
      //   // headerTitleStyle: { color: "#ededed" },
      //   headerBackTitle: null,
      //   // headerTintColor: "#ededed",
      //   headerLeft: (
      //     <TouchableOpacity onPress={() => navigation.navigate.goBack(null)}>
      //       <IconSimple
      //         name="arrow-left"
      //         size={20}
      //         style={{ color: "#081c2f" }}
      //       />
      //     </TouchableOpacity>
      //   )
      // })
    }
  },
  {
    transitionConfig: NavigationConfig,
    headerMode: "screen",
    navigationOptions: {}
  }
);

const styles = EStyleSheet.create({
  tabIcons: {
    "@media ios": {
      paddingTop: 4,
      paddingBottom: 0
    },
    "@media android": {
      paddingTop: 0,
      paddingBottom: 2
    }
  }
});
