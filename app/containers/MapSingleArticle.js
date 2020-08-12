import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import MapView from "react-native-maps";
import FastImage from "react-native-fast-image";
import { ArticleHeader } from "../components/ArticleHeader";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import { StatusBarCustom } from "../components/StatusBarCustom";

const markerIco = require("../assets/marker-grey.png");
const selectedMarkerIco = require("../assets/marker-red.png");

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT + 40;
const WIDTH_INTERVAL = CARD_WIDTH + 15;
const SCROLL_INTERVAL = WIDTH_INTERVAL - width / 6.5;

const MAP_PADDING = { top: 150, right: 150, bottom: 800, left: 150 };

class MapSingleArticle extends Component {
  constructor(props) {
    super(props);
    this.startMap = this.startMap.bind(this);
    this.onLearnMore = this.onLearnMore.bind(this);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.1822,
        longitudeDelta: 0.1822
      }
    };
  }

  onLearnMore = item => {
    this.props.navigation.navigate("ArticleContainer", item);
  };

  startMap = () => {
    // console.log(
    //   "Start MapSingleArticle",
    //   this.props.navigation.state.params.location_coords.lat
    // );
    // console.log("Start MapSingleArticle", this.props.region.latitudeDelta);
    // const lat = this.props.navigation.state.params.location_coords.lat;
    // const lng = this.props.navigation.state.params.location_coords.lng;
    // const latDelta = this.props.region.latitudeDelta;
    // const lngDelta = this.props.region.longitudeDelta;

    // const newRegion = {
    //   latitude: lat,
    //   longitude: lng,
    //   latitudeDelta: latDelta,
    //   longitudeDelta: lngDelta
    // };

    // this.setState({ region: newRegion });

    const markerPos = this.props.navigation.state.params.location_coords;
    console.log("markerPos", markerPos);

    this.setState({ initMap: true });
    // const newRegion = this.map.getMapRef().animateToCoordinate(markerPos, {
    //   edgePadding: MAP_PADDING,
    //   animated: false
    // });
    // this.setState({ region: newRegion });
    // setTimeout(() => {
    //   console.log("regionSet = true!");
    //   this.setState({ regionSet: true });
    // }, 1500);

    // this.map.animateToCoordinate({ markerPos }, 1);
    setTimeout(() => {
      console.log("regionSet = true!");
      // this.map.animateToCoordinate(
      //   {
      //     latitude: markerPos.lat,
      //     longitude: markerPos.lng,
      //     edgePadding: MAP_PADDING
      //   },
      //   1
      // );
      // this.map.fitToCoordinates(
      //   [
      //     {
      //       latitude: markerPos.lat,
      //       longitude: markerPos.lng
      //     }
      //   ],
      //   {
      //     // edgePadding: MAP_PADDING,
      //     animated: false
      //   }
      // );
      // this.map.fitToElements(0, { edgePadding: MAP_PADDING });

      const lat = this.props.navigation.state.params.location_coords.lat;
      const lng = this.props.navigation.state.params.location_coords.lng;
      const latDelta = this.props.region.latitudeDelta;
      const lngDelta = this.props.region.longitudeDelta;

      const newRegion = {
        latitude: lat - 0.01,
        longitude: lng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta
      };

      this.setState({ region: newRegion });
    }, 50);
  };

  onRegionChange = region => {
    currentRegion = region;
  };

  render() {
    const {
      title,
      image,
      source_name,
      location_city,
      location_coords,
      article_link,
      publishing_date,
      snippet,
      staticData
      // navigation
    } = this.props.navigation.state.params;
    const navigation = this.props.navigation;
    // const { latitudeDelta, longitudeDelta } = this.props.region;

    // this.setState({
    //   region: {
    //     latitude: location_coords.lat,
    //     longitude: location_coords.lng,
    //     latitudeDelta: latitudeDelta,
    //     longitudeDelta: longitudeDelta
    //   }
    // });

    return (
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <MapView
            ref={r => {
              this.map = r;
            }}
            style={styles.mapStyle}
            region={this.state.region}
            onMapReady={() => this.startMap(this.props)}
            onRegionChangeComplete={this.onRegionChange}
            // showsUserLocation={true}
            rotateEnabled={false}
            // mapPadding={{ top: 50, right: 50, bottom: 350, left: 50 }}
          >
            <MapView.Marker
              coordinate={{
                latitude: location_coords.lat,
                longitude: location_coords.lng
              }}
            >
              <Image source={selectedMarkerIco} style={styles.markerStyle} />
            </MapView.Marker>
          </MapView>
        </View>

        <View style={styles.carousel}>
          <TouchableOpacity
            underlayColor={"#fff"}
            style={styles.cardBackground}
            activeOpacity={1}
            onPress={() => this.onLearnMore(this.props)}
          >
            <View style={styles.card}>
              <FastImage
                source={{
                  uri: image,
                  priority: FastImage.priority.normal
                }}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={2} style={styles.cardtitle}>
                  {title}
                </Text>
                <Text numberOfLines={1} style={styles.cardSource}>
                  {source_name}
                </Text>
              </View>
              <View style={styles.articleHighlight} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack(null)}
            // onPress={() => console.log(this.props)}
          >
            <View style={styles.iconContainer}>
              <IconSimple name="arrow-left" size={20} style={styles.backIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* {/* <ArticleHeader
          source_name={source_name}
          navigation={navigation}
          image={image}
          style={styles.articleHeader}
        /> */}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  statusBar: {
    height: 22,
    backgroundColor: "$primaryBrandColor"
  },
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
    marginBottom: -20
    // marginTop: -265
    // backgroundColor: "yellow"
  },
  mapStyle: {
    flex: 1
  },
  mapContainer: {
    flex: 1
    // paddingBottom: 400
    // ...StyleSheet.absoluteFillObject
  },
  header: {
    height: 45,
    marginTop: 22,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    // backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "center"
    // paddingHorizontal: 15
  },
  articleHeader: {
    position: "absolute",
    // bottom: 10,
    left: 0,
    // right: 0,
    top: 0,
    width: width,
    marginBottom: 25,
    paddingHorizontal: 10
  },
  markerStyle: {
    width: 40,
    height: 52,
    "@media ios": {
      marginBottom: 40
    }
  },
  carousel: {
    position: "absolute",
    bottom: 10,
    left: 0,
    // right: 0,
    width: width,
    marginBottom: 25
    // paddingLeft: 3
    // paddingRight: 3,
    // backgroundColor: "red"
  },
  card: {
    padding: 8,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius: 2,
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    alignSelf: "center"
  },
  cardBackground: {
    borderRadius: 2,
    paddingHorizontal: 7,
    // marginRight: 15,
    flex: 1
    // backgroundColor: "blue"
  },
  cardImage: {
    flex: 2,
    width: "100%",
    height: "60%",
    alignSelf: "center",
    borderRadius: 2,
    backgroundColor: "#ddd"
  },
  textContent: {
    flex: 1,
    marginTop: 8,
    marginBottom: 4,
    justifyContent: "space-around",
    flexDirection: "column"
  },
  cardtitle: {
    fontSize: 18,
    lineHeight: 22,
    color: "$primaryTextBlack",
    fontWeight: "800"
  },
  cardSource: {
    fontSize: 12,
    fontWeight: "600",
    color: "$primaryTextBlack"
  },
  articleHighlight: {
    position: "absolute",
    height: 4,
    backgroundColor: "rgba(248,42,39, .8)",
    bottom: 0,
    left: 0,
    right: 0
  },
  markerWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "red"
  },
  ring: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: "#6DB3FF",
    position: "absolute"
    // borderWidth: 1,
    // borderColor: "rgba(8,28,47, 0.5)"
  },
  userMarker: {
    height: 22,
    width: 22,
    // borderWidth: 3,
    // borderColor: "#fff",
    borderRadius: 22 / 2,
    // overflow: "hidden",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowRadius: 3,
    shadowOpacity: 0.3
  },
  userMarkerInner: {
    position: "absolute",
    height: 16,
    width: 16,
    // borderWidth: 3,
    // borderColor: "white",
    borderRadius: 16 / 2,
    overflow: "hidden",
    backgroundColor: "#6DB3FF"
  },
  iconContainer: {
    width: 80,
    paddingLeft: 15,
    // backgroundColor: "red",
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.15
  },
  backIcon: {
    color: "$primaryTextBlack"
  }
});

const mapStateToProps = state => {
  return {
    region: state.deviceLocReducer.region
  };
};

export default connect(mapStateToProps)(MapSingleArticle);
