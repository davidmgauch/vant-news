import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingBottom: 15
  },
  imageContainer: {
    flex: 1,
    height: 225,
    alignItems: "stretch"
  },
  thumbnail: {
    flex: 1,
    // padding: 2,
    borderWidth: 0.5,
    borderColor: "#fff",
    // borderRadius: 5,
    backgroundColor: "#ddd"
  },
  articleContainer: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 20
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    color: "$primaryTextBlack",
    fontWeight: "$primaryFontWeightThick",
    marginBottom: 6,
    textAlign: "left"
    // fontFamily: "$globalFontFamily"
  },
  publisher: {
    textAlign: "left",
    color: "$primaryTextBlack",
    fontSize: 16,
    fontWeight: "$primaryFontWeightMedium"
    // fontFamily: "$globalFontFamily"
  },
  bottomRow: {
    paddingTop: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "yellow"
  },
  bottomRowLeft: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
    // backgroundColor: "red"
  },
  bottomRowRight: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
    // backgroundColor: "green"
  },
  location: {
    textAlign: "left",
    color: "#555",
    fontSize: 13,
    fontWeight: "$primaryFontWeightThin"
    // paddingTop: 5,
  },
  articleLocationMarker: {
    paddingRight: 4,
    // paddingTop: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#555",
    shadowRadius: 0.3,
    shadowOpacity: 1
  }
});
