import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import geolib from "geolib";
import Icon from "react-native-vector-icons/SimpleLineIcons";
// import Moment from "react-moment";

import styles from "./styles";

const dateToFormat = "1976-04-19T12:59-0500";

class FeedItem extends Component {
  constructor(props) {
    super(props);
    // this.handleArticlePress = this.handleArticlePress.bind(this);
  }

  handleArticlePress(item) {
    // console.log("pressed", item);
    this.props.navigation.navigate("ArticleContainer", item);
  }

  handleLocationPress(item) {
    // console.log("pressed", item);
    this.props.navigation.navigate("MapSingleArticle", item);
  }

  renderDist() {
    // console.log("renderDist", this.props.location_coords);
    const geotag = geolib.getDistance(
      {
        latitude: this.props.deviceLocation.latitude,
        longitude: this.props.deviceLocation.longitude
      },
      {
        latitude: this.props.location_coords.lat,
        longitude: this.props.location_coords.lng
      }
    );

    // console.log("renderDist", geotag);

    const geoconvert = geolib.convertUnit("mi", geotag, 1);
    const georounded = Math.round(geoconvert);

    console.log(geoconvert);

    return (
      <View>
        {/* {geoconvert < 0.8 && (
          <Text style={styles.location}>&lt; 1 mile away</Text>
        )} */}
        {geoconvert < 0.8 && (
          <Text style={styles.location}>{geoconvert} miles away</Text>
        )}
        {geoconvert < 1.5 &&
          geoconvert >= 0.8 && (
            <Text style={styles.location}>{geoconvert} mile away</Text>
          )}
        {geoconvert > 1.5 && (
          <Text style={styles.location}>{georounded} miles away</Text>
        )}
      </View>
    );
  }

  render() {
    // console.log("FeedItem Props", this.props.deviceLocation);
    const {
      title,
      image,
      source_name,
      location_city,
      location_coords,
      article_link,
      publishing_date,
      snippet,
      navigation,
      feed_test_data
    } = this.props;

    return (
      <View style={styles.container}>
        {image && (
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={1}
            onPress={() => this.handleArticlePress(this.props)}
            // onPress={() => navigation.navigate("ArticleContainer")}
          >
            <View style={styles.imageContainer}>
              <FastImage
                style={styles.thumbnail}
                borderRadius={5}
                source={{
                  uri: image,
                  priority: FastImage.priority.normal
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        <View style={styles.articleContainer}>
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={1}
            onPress={() => this.handleArticlePress(this.props)}
          >
            <Text style={styles.title} numberOfLines={3}>
              {title}
            </Text>
          </TouchableOpacity>
          <View style={styles.bottomRow}>
            <View style={styles.bottomRowLeft}>
              <Text style={styles.publisher}>{source_name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.handleLocationPress(this.props)}
            >
              <View style={styles.bottomRowRight}>
                <Icon
                  style={styles.articleLocationMarker}
                  name="location-pin"
                  size={10}
                  color={"#555"}
                />
                {/* {feed_test_data === true && this.renderDist()} */}
                {feed_test_data === false ? (
                  <Text style={styles.location}>{location_city}</Text>
                ) : (
                  this.renderDist()
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceLocation: state.deviceLocReducer.deviceLocation
  };
};

export default connect(mapStateToProps)(FeedItem);
// export default FeedItem;
