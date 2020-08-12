import React, { Component } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import {
  WebView,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Animated,
  Easing,
  Linking,
  Platform,
  StatusBar
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import Spinner from "react-native-spinkit";
const spinnerSize = 50;
import { ArticleHeader } from "../components/ArticleHeader";
import { ArticleHeaderWeb } from "../components/ArticleHeaderWeb";
// import { StatusBarCustom } from "../components/StatusBarCustom";
const { width, height } = Dimensions.get("window");
import moment from "moment";
import HtmlText from "react-native-html-to-text";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import SafariView from "react-native-safari-view";
import { StatusBarCustom } from "../components/StatusBarCustom";
import HeaderImageScrollView, {
  TriggeringView
} from "react-native-image-header-scroll-view";
import {
  CustomTabs,
  ANIMATIONS_SLIDE,
  ANIMATIONS_FADE
} from "react-native-custom-tabs";

class ArticleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      showView: true,
      menu_expanded: false,
      header_height: 300,
      snippet:
        "Santa Monica’s Human Services Administrator Margaret Willis told the Council Tuesday, 'Homelessness has reached levels we have not seen since our earliest homeless counts. As the statewide housing crisis continues to push households onto the couches of friends, into cars, and onto the streets, Santa Monica will continue to see people from all over the county, the state, and the country seeking the safety, the natural beauty, and the compassion that are hallmarks of this community.'"
    };
  }

  openMenu() {
    //IOS SAFARI BROWSER
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("dark-content", true);
      SafariView.isAvailable()
        .then(
          SafariView.show({
            url: this.props.navigation.state.params.article_link,
            fromBottom: true
          })
        )
        .catch(error => {
          // Fallback WebView code for iOS 8 and earlier
          Linking.openURL(this.props.navigation.state.params.article_link);
        });
      let dismissSubscription = SafariView.addEventListener("onDismiss", () => {
        StatusBar.setBarStyle("light-content");
      });
    } else {
      // Linking.openURL(this.props.navigation.state.params.article_link);
      CustomTabs.openURL(this.props.navigation.state.params.article_link, {
        toolbarColor: EStyleSheet.value("$primaryBrandColor")
      });
    }
  }

  renderLoadingView = () => {};

  noImage = () => {
    console.log("no image");
    // this.setState({ header_height: 0 })
  };

  render() {
    const {
      title,
      image,
      source_name,
      location_city,
      article_link,
      publishing_date,
      snippet,
      staticData
      // navigation
    } = this.props.navigation.state.params;
    const navigation = this.props.navigation;

    const date = moment.unix(publishing_date).fromNow();
    // console.log(" IMAGE", image);
    // if (image) {
    //   this.setState({ header_height: 300 });
    //   console.log("YES IMAGE");
    // } else {
    //   console.log("NO IMAGE");
    //   this.setState({ header_height: 0 });
    // }

    return (
      //Test this on phone to see if it works
      // <View style={{ flex: 1, backgroundColor: "blue" }} />

      <View
        style={styles.zoomContainer}
        minimumZoomScale={1.0}
        maximumZoomScale={1.3}
        bouncesZoom={true}
        scrollEnabled={false}
      >
        <View style={styles.initialContainer}>
          <View style={styles.initialContainerInner}>
            <HeaderImageScrollView
              maxHeight={this.state.header_height}
              minHeight={60}
              // headerImage={require(image)}
              showsVerticalScrollIndicator={false}
              overlayColor={"#081c2f"}
              maxOverlayOpacity={1}
              minOverlayOpacity={0}
              renderHeader={() => (
                <View style={{ flex: 1 }}>
                  {image && (
                    <TouchableWithoutFeedback onPress={() => this.openMenu()}>
                      <View style={styles.imageContainer}>
                        <FastImage
                          style={styles.thumbnail}
                          source={{
                            uri: image,
                            priority: FastImage.priority.normal
                          }}
                        />
                        <LinearGradient
                          colors={[
                            "rgba(0, 0, 0, 0.6)",
                            "rgba(0, 0, 0, 0.3)",
                            "rgba(0, 0, 0, 0.1)",
                            "rgba(0, 0, 0, 0)",
                            "rgba(0, 0, 0, 0)",
                            "rgba(0, 0, 0, 0)"
                          ]}
                          style={styles.containerOuter}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  {/* {!image && noImage()} */}
                </View>
              )}
            >
              <View style={styles.innerTextContainer} borderRadius={10}>
                {image && <Text style={styles.publisher}>{source_name}</Text>}
                <TouchableWithoutFeedback onPress={() => this.openMenu()}>
                  <View>
                    <Text style={styles.title}>{title}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.rowSplit}>
                  <View style={styles.rowLeft}>
                    {staticData ? (
                      <Text style={styles.snippet}>3 hours ago</Text>
                    ) : (
                      <Text style={styles.date}>{date}</Text>
                    )}
                  </View>
                  <View style={styles.rowRight}>
                    <Icon
                      style={styles.articleLocationMarker}
                      name="location-pin"
                      size={10}
                      color={"#555"}
                    />
                    <Text style={styles.date}>{location_city}</Text>
                  </View>
                </View>
                <HtmlText style={styles.snippet} html={snippet} />
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0)",
                    "rgba(255, 255, 255, 0.6)",
                    "rgba(255, 255, 255, 1)",
                    "rgba(255, 255, 255, 1)"
                  ]}
                  style={styles.bottomGradient}
                />
              </View>
            </HeaderImageScrollView>
          </View>

          <TouchableHighlight
            underlayColor={"#af0e0e"}
            activeOpacity={1}
            style={styles.readMoreButton}
            onPress={() => this.openMenu()}
          >
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableHighlight>
        </View>
        <ArticleHeader
          source_name={source_name}
          navigation={navigation}
          image={image}
        />
        {/* <StatusBarCustom color="#ff0000" textColor={"dark-content"} /> */}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  zoomContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  locationModal: {
    position: "absolute",
    width: width,
    height: height,
    top: height,
    backgroundColor: "white"
    // alignItems: "center"
  },
  webContainer: {
    flex: 1,
    height: height
  },
  initialContainer: {
    position: "absolute",
    width: width,
    height: height,
    top: 0,
    left: 0,
    backgroundColor: "white"
  },
  initialContainerInner: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    flex: 1,
    flexDirection: "column"
  },
  initialScrollContainer: {
    flex: 1,
    marginHorizontal: 0
  },
  rowSplit: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8
  },
  rowLeft: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
    // backgroundColor: "red"
  },
  rowRight: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
    // backgroundColor: "green"
  },
  date: {
    textAlign: "left",
    color: "#777",
    fontSize: 13,
    lineHeight: 32,
    fontWeight: "$primaryFontWeightThin"
  },
  location: {
    textAlign: "left",
    color: "#555",
    fontSize: 13,
    fontWeight: "600"
    // paddingTop: 5,
  },
  articleLocationMarker: {
    paddingRight: 4,
    // paddingTop: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#555",
    shadowRadius: 0.3,
    shadowOpacity: 1
  },
  imageContainer: {
    flex: 1,
    height: 300,
    width: width,
    padding: 0
    // alignItems: "stretch",
    // justifyContent: "center",
    // backgroundColor: '#eee',
  },
  thumbnail: {
    flex: 1,
    // width: null,
    // height: 400,
    // borderWidth: 0.5,
    // borderColor: "#fff",
    // borderRadius: 5,
    backgroundColor: "#ddd"
  },
  innerTextContainer: {
    padding: 20,
    backgroundColor: "white",
    marginTop: "$overlayNegativeMarginTop"
  },
  publisher: {
    textAlign: "left",
    color: "$primaryTextBlack",
    fontSize: 22,
    fontWeight: "$primaryFontWeightThin",
    paddingTop: 8
    // paddingBottom: 5,
  },
  publisherAlt: {
    textAlign: "left",
    color: "$primaryTextBlack",
    fontSize: 22,
    fontWeight: "$primaryFontWeightThin",
    paddingTop: 8,
    paddingLeft: 30
    // paddingBottom: 5,
  },
  title: {
    fontSize: 27,
    lineHeight: 35,
    color: "$primaryTextBlack",
    fontWeight: "$primaryFontWeightThick",
    marginBottom: 4,
    textAlign: "left",
    paddingTop: 8
  },
  snippet: {
    textAlign: "left",
    color: "$primaryTextBlack",
    fontSize: 17,
    lineHeight: 32,
    paddingTop: 8,
    fontWeight: "$primaryFontWeightThin"
  },
  redoSearchContainer: {
    flex: 1
    // height:40,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  readMoreButton: {
    position: "relative",
    bottom: 0,
    left: 0,
    width: width,
    height: 55,
    marginBottom: "$marginBottom",
    // paddingVertical: 8,
    // marginTop: 15,
    backgroundColor: "$secondaryBrandColor",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  readMoreText: {
    fontSize: 17,
    textAlign: "center",
    // color: "#081C2F",
    color: "#FAFAFA",
    fontWeight: "700"
  },
  bottomGradient: {
    height: 200,
    width: width,
    // backgroundColor: "blue",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  noImageFill: {
    flex: 1,
    height: 55
  },
  containerOuter: {
    // position: "absolute",
    // top: 0
    // flex: 1
    // height:
    ...StyleSheet.absoluteFillObject
  }
});

export default ArticleContainer;
