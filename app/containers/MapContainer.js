import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Easing
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import MapApi from "../lib/tempMapApi";
import { Marker, Callout } from "react-native-maps";
import ClusteredMapView from "react-native-maps-super-cluster";
import { Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
// import TimerMixin from "react-timer-mixin";

const markerIco = require("../assets/marker-grey.png");
const selectedMarkerIco = require("../assets/marker-red.png");

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = CARD_HEIGHT + 40;
const WIDTH_INTERVAL = CARD_WIDTH + 15;
const SCROLL_INTERVAL = WIDTH_INTERVAL - width / 6.5;

const MAP_PADDING = { top: 50, right: 50, bottom: 300, left: 50 };

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.scale_value = new Animated.Value(0);
    this.opacity_value = new Animated.Value(0.35);
    this.scaleInner_value = new Animated.Value(1);
    this.state = {
      selectedMarkerIndex: 0,
      initMap: true,
      regionSet: false,
      redoMapSearch: false,
      minZoom: 0,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    };
  }

  onLearnMore = item => {
    this.props.navigation.navigate("ArticleContainer", item);
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // console.log("componentdidmount");
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.5); // animate 30% away from landing on the next item

      if (index >= MapApi.index) {
        index = MapApi.index - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      // console.log("carousel index", index);

      this.setState({ selectedMarkerIndex: index });
    });

    // Animated.loop(
    //     Animated.timing(this.scale, {
    //       toValue: 2.5,
    //       duration: 500,
    //     }
    // ).start();

    Animated.loop(
      Animated.parallel([
        Animated.timing(this.scale_value, {
          toValue: 7,
          duration: 3000
          // easing: Easing.easeOut
        }),
        Animated.timing(this.opacity_value, {
          toValue: 0,
          duration: 3000
          // easing: Easing.easeOut
        }),
        Animated.timing(this.scaleInner_value, {
          toValue: 0,
          duration: 3000,
          easing: Easing.easeOut
        })
      ])
    ).start();
  }

  startMap = () => {
    // console.log("Start Map");
    const markerPos = MapApi.map((marker, index) => {
      return marker.location;
    });
    this.setState({ initMap: true });
    this.map.getMapRef().fitToCoordinates(markerPos, {
      edgePadding: MAP_PADDING,
      animated: false
    });

    // this.map.getMapRef({ minZoomLevel: 10 });
    // console.log("Start Map", newRegion);
    // this.setState({ region: newRegion });
    setTimeout(() => {
      // console.log("regionSet = true!");
      this.setState({ regionSet: true, minZoom: 10 });
    }, 1500);
  };

  renderCluster = (cluster, onPress) => {
    // console.log("rednerCluster", cluster, onPress);
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId;

    const clusteringEngine = this.map.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100);
    if (
      clusteredPoints.some(
        e => e.properties.item.index === this.state.selectedMarkerIndex
      )
    ) {
      return (
        <Marker coordinate={coordinate} onPress={onPress}>
          <View style={styles.clusterActive}>
            <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
          </View>
        </Marker>
      );
    } else {
      return (
        <Marker coordinate={coordinate} onPress={onPress}>
          <View style={styles.clusterInactive}>
            <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
          </View>
        </Marker>
      );
    }
  };

  markerPressed = data => {
    // this._sliderRef.snapToItem(data.index, (animated = false));
    // this.setState({ selectedMarkerIndex: data.index });
    // console.log("markerPressed", data.length);
    var carouselArticlePosition = WIDTH_INTERVAL * data.index;
    this.setState({ selectedMarkerIndex: data.index });
    this.refs._scrollView._component.scrollTo({
      x: carouselArticlePosition,
      animated: false
    });
  };

  renderMarker = data => (
    <Marker
      key={data.title || Math.random()}
      coordinate={data.location}
      onPress={() => this.markerPressed(data)}
    >
      {this.state.selectedMarkerIndex === data.index ? (
        <Image source={selectedMarkerIco} style={styles.markerStyle} />
      ) : (
        <Image source={markerIco} style={styles.markerStyle} />
      )}
      {/* MIGHT NEED THIS FOR ANDROID */}
      {/* {this.state.selectedMarkerIndex != data.index ? (
        <Image source={markerIco} style={styles.markerStyle} />
      ) : null} */}
    </Marker>
  );

  onRegionChange = region => {
    currentRegion = region;
    this.showSearchButton(region);
  };

  showSearchButton = region => {
    // console.log("redoMapSearch 1");
    // console.log(region);
    if (this.state.regionSet) {
      // console.log("redoMapSearch 2");
      this.setState({ redoMapSearch: true });
    }
  };

  searchButtonPressed() {
    console.log("searchButtonPressed");
    this.setState({ redoMapSearch: false });
  }

  render() {
    const scale = this.scale_value.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1]
    });
    const opacity = this.opacity_value.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const scaleInner = this.scaleInner_value.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.85, 1]
    });
    return (
      <View style={styles.container}>
        <ClusteredMapView
          ref={r => {
            this.map = r;
          }}
          style={styles.mapContainer}
          data={MapApi}
          initialRegion={this.state.region}
          // onMapReady={() => this.startMap()}
          onLayout={() => this.startMap()}
          onRegionChangeComplete={this.onRegionChange}
          // showsUserLocation={true}
          rotateEnabled={false}
          renderMarker={this.renderMarker}
          renderCluster={this.renderCluster}
          // edgePadding={{ top: 50, right: 50, bottom: 300, left: 50 }}
          minZoomLevel={this.state.minZoom}
          // maxZoomLevel={15}
        >
          <Marker coordinate={{ latitude: 34.018572, longitude: -118.488947 }}>
            <View style={styles.markerWrap}>
              {/* <Animated.View style={styles.ring} /> */}
              <Animated.View
                style={[
                  styles.ring,

                  {
                    opacity: opacity,
                    transform: [
                      {
                        scale: scale
                      }
                    ]
                  }
                ]}
              />
              <View style={styles.userMarker} />
              {/* <View style={styles.userMarkerInner} /> */}
              <Animated.View
                style={[
                  styles.userMarkerInner,

                  {
                    transform: [
                      {
                        scale: scaleInner
                      }
                    ]
                  }
                ]}
              />
            </View>
          </Marker>
        </ClusteredMapView>
        <Animated.ScrollView
          style={styles.carousel}
          ref="_scrollView"
          scrollEventThrottle={20}
          horizontal={true}
          decelerationRate={0}
          // centerContent={true}
          snapToInterval={WIDTH_INTERVAL}
          snapToAlignment={"start"}
          showsHorizontalScrollIndicator={false}
          contentInset={{ top: 0, left: 0, bottom: 0, right: 7 }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          {MapApi.map((item, i) => (
            <TouchableOpacity
              underlayColor={"#fff"}
              style={styles.cardBackground}
              activeOpacity={1}
              key={item.title}
              onPress={() => this.onLearnMore(item)}
            >
              <View style={styles.card}>
                <FastImage
                  source={{
                    uri: item.image,
                    priority: FastImage.priority.normal
                  }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text numberOfLines={2} style={styles.cardtitle}>
                    {item.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.cardSource}>
                    {item.source_name}
                  </Text>
                </View>
                {this.state.selectedMarkerIndex === i && (
                  <View style={styles.articleHighlight} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
        {this.state.redoMapSearch && (
          <Animatable.View
            animation="slideInDown"
            duration={200}
            delay={300}
            style={styles.redoSearchContainer}
          >
            <Button
              buttonStyle={styles.redoSearchButton}
              textStyle={styles.redoSearchText}
              title={`Search this area`}
              onPress={() => this.searchButtonPressed()}
            />
          </Animatable.View>
        )}
        {!this.state.redoMapSearch && (
          <Animatable.View
            animation="fadeOut"
            duration={100}
            delay={0}
            style={styles.redoSearchContainer}
          >
            <Button
              buttonStyle={styles.redoSearchButton}
              textStyle={styles.redoSearchText}
              title={`Search this area`}
              onPress={() => this.searchButtonPressed()}
            />
          </Animatable.View>
        )}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    "@media ios": {
      marginBottom: -20
    }
    // marginBottom: -20
    // "@media android": {
    //   marginBottom: "$marginBottom"
    // },
    // marginTop: "$headerHeight"
  },
  mapContainer: {
    flex: 1
  },
  markerStyle: {
    width: 40,
    height: 52,
    "@media ios": {
      marginBottom: 40
    }
  },
  clusterInactive: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#303030",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  clusterActive: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#da2a27",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  myClusterTextStyle: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "600"
  },
  carousel: {
    position: "absolute",
    bottom: 10,
    left: 0,
    // right: 0,
    width: width,
    marginBottom: 25,
    paddingLeft: 3
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
    overflow: "hidden"
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
  redoSearchContainer: {
    position: "absolute",
    // backgroundColor: '#ccc',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  redoSearchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 15,
    // backgroundColor: '#081C2F',
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    alignSelf: "center",
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "black",
    shadowRadius: 1.5,
    shadowOpacity: 0.2
  },
  redoSearchText: {
    fontSize: 12,
    color: "#081C2F",
    fontWeight: "500"
  }
});

const mapStateToProps = state => {
  return {
    region: state.deviceLocReducer.region
  };
};

export default connect(mapStateToProps)(MapContainer);
