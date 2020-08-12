import EStyleSheet from "react-native-extended-stylesheet";
// import { deviceWidth, deviceHeight } from "./Header";
import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default EStyleSheet.create({
  containerOuter: {
    backgroundColor: "$primaryBrandColor",
    position: "absolute",
    top: 0,
    left: 0,
    width: deviceWidth,
    height: "$headerHeight"
    // height: auto
    // flex: 1
  },
  containerInner: {
    "@media ios": {
      paddingTop: 18
    },
    "@media android": {
      paddingTop: 0
    },
    // "@media ios": {
    //   paddingTop: 15
    // },
    // "@media android": {
    //   paddingTop: 0
    // },
    // flex: 1,
    height: "$headerHeight",
    paddingHorizontal: 20,
    // paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "$primaryBrandColor"
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
    // backgroundColor: "green"
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "$primaryFontWeightMedium",
    fontSize: 14
  },
  rightIcon: {
    color: "white",
    paddingTop: 3
  },
  locationModal: {
    position: "absolute",
    width: deviceWidth,
    height: deviceHeight,
    top: -deviceHeight,
    backgroundColor: "yellow",
    alignItems: "center",
    marginBottom: 40
  },
  buttonAddLocation: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 20,
    right: 20,
    borderRadius: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  iconAdd: {
    color: "white",
    paddingTop: 3
    // borderWidth: 1,
    // borderColor: "yellow"
  }
});
