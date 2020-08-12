import EStyleSheet from "react-native-extended-stylesheet";
// import { deviceWidth, deviceHeight } from "./Header";
import { Dimensions, StatusBar } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default EStyleSheet.create({
  container: {
    "@media ios": {
      // paddingTop: 15,
      height: 20
    },
    "@media android": {
      // paddingTop: 0,
      height: 25
    },
    // backgroundColor: "$primaryBrandColor",
    backgroundColor: "#fff"
    // height: 20
  }
});
