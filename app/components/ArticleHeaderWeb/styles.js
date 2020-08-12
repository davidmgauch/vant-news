import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  containerOuter: {
    "@media ios": {
      paddingTop: 15
    },
    "@media android": {
      paddingTop: 0
    },
    backgroundColor: "#081c2f"
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
    flex: 10,
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
  iconContainerLeft: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 15
  },
  iconContainerRight: {
    flex: 1,
    alignItems: "flex-end",
    paddingHorizontal: 20
  }
});
