import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
// import { itemHorizontalMargin, carouselVerticalMargin } from "./HeaderCardList";

const { width, height } = Dimensions.get("window");

const itemHorizontalMargin = 10;
const carouselVerticalMargin = height - 630;

export default EStyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "$primaryBrandColor"
  },
  card: {
    marginTop: 100,
    backgroundColor: "blue",
    width: width - 80,
    margin: 10,
    height: 500,
    borderRadius: 10
  },
  addCardContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  addCard: {
    marginTop: 100,
    // backgroundColor: "blue",
    width: width - 80,
    margin: 10,
    height: 500,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff"
    // justifyContent: "center",
    // alignItems: "center"
  },
  addCardIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow"
  },
  iconAdd: {
    color: "white",
    paddingTop: 50
  },
  addCardTitle: {
    padding: 25,
    fontWeight: "300",
    // paddingHorizontal: 80,
    fontSize: 50,
    lineHeight: 55,
    color: "white",
    textAlign: "left"
  },
  title: {
    padding: 25,
    fontSize: 50,
    lineHeight: 55,
    color: "white",
    textAlign: "left"
  },
  locationInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 25
  },
  city: {
    // paddingTop: 16,
    fontSize: 30,
    lineHeight: 40,
    color: "white",
    textAlign: "left"
  },
  state: {
    // paddingTop: 2,
    fontSize: 30,
    lineHeight: 40,
    color: "white",
    textAlign: "left"
  },
  zipCode: {
    // paddingTop: 2,
    fontSize: 30,
    // lineHeight: 40,
    color: "white",
    textAlign: "left"
  },
  cardActionButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 25
  },
  action: {
    // paddingTop: 16,
    fontSize: 30,
    // lineHeight: 40,
    color: "white",
    textAlign: "right"
  }
});
