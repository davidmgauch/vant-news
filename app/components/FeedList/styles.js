import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    marginTop: "$headerHeight"
    // paddingTop: 15
  },
  feedHeader: {
    flex: 1,
    // height: 60,
    flexDirection: "row",
    // backgroundColor: '#777',
    // justifyContent: 'center',
    alignItems: "center",
    justifyContent: "flex-end",
    // paddingHorizontal: 15,
    paddingVertical: 25
  },
  feedHeaderLeft: {
    flex: 5,
    // backgroundColor: '#444',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  feedHeaderRight: {
    flex: 1,
    // backgroundColor: '#777',
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row"
    // backgroundColor: "blue"
  },
  feedHeaderLocation: {
    color: "$primaryBrandColor",
    fontSize: 20,
    fontWeight: "$primaryFontWeightMedium"
    // padding: 10,
  },
  feedHeaderLocationMarker: {
    paddingRight: 7,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "$primaryBrandColor",
    shadowRadius: 0.3,
    shadowOpacity: 1
  },
  weatherIconContainer: {
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "red"
  },
  weatherIcon: {
    marginTop: 1,
    width: 35,
    height: 35,
    tintColor: "$primaryBrandColor",
    alignSelf: "center"
    // overlayColor: "$primaryBrandColor"
  }
});
