import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  containerOuter: {
    "@media ios": {
      paddingTop: 15
    },
    "@media android": {
      paddingTop: 0
    },
    backgroundColor: "#081c2f00"
  },
  containerOuterNoImage: {
    "@media ios": {
      paddingTop: 15
    },
    "@media android": {
      paddingTop: 0
    },
    backgroundColor: "$primaryBrandColor"
  },
  containerInner: {
    // flex: 1,
    height: 45,
    // paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "$primaryFontWeightThick",
    fontSize: 14
  },
  rightIcon: {
    color: "white",
    paddingTop: 3
  },
  leftIcon: {
    color: "white",
    paddingTop: 3
  },
  leftIconDark: {
    // color: "$primaryBrandColor",
    color: "#999",
    paddingTop: 3
  },
  iconContainer: {
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: "$primaryTextBlack",
    width: 80,
    paddingLeft: 15,
    // backgroundColor: "red",
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.15
  },
  iconContainerAlt: {
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: "$primaryTextBlack",
    width: 80,
    paddingLeft: 15
    // backgroundColor: "red",
    // shadowOffset: { width: 0.2, height: 0.2 },
    // shadowColor: "black",
    // shadowRadius: 1,
    // shadowOpacity: 0.3
  }
});
