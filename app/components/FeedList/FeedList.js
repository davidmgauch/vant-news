import React, { Component } from "react";
import { FlatList, Text, View, Image } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import styles from "./styles";
import { FeedItem } from "../FeedItem";
import Icon from "react-native-vector-icons/Ionicons";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import upperCase from "upper-case";

import { requestFeedData } from "../../redux/actions";

class FeedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      results: 10,
      seed: 1,
      page: 0,
      test_data: false,
      error: null,
      refreshing: false,
      propsRevieved: false
    };
  }

  _renderItem = ({ item }) => (
    <FeedItem
      title={item.title}
      image={item.img_large}
      source_name={item.source_name}
      location_city={item.location.city}
      location_coords={item.location.coordinates}
      article_link={item.article_link}
      publishing_date={item.publishing_date}
      snippet={item.snippet}
      navigation={this.props.navigation}
      feed_test_data={this.props.feedTestData}
    />
  );

  renderHeader = () => {
    return (
      <View style={styles.feedHeader}>
        <View style={styles.feedHeaderLeft}>
          {/* <Icon
            style={styles.feedHeaderLocationMarker}
            name="ios-pin"
            size={18}
            color={"#081c2f"}
          /> */}
          <IconSimple
            style={styles.feedHeaderLocationMarker}
            name="location-pin"
            size={16}
            color={"#081c2f"}
          />
          <Text style={styles.feedHeaderLocation}>
            {upperCase(this.props.currentCity)}
          </Text>
        </View>
        <View style={styles.feedHeaderRight}>
          {/* <View style={styles.weatherIconContainer}>
            <Image
              style={styles.weatherIcon}
              source={{
                uri: this.props.currentWeatherIcon
              }}
            />
          </View> */}
          <Text style={styles.feedHeaderLocation}>
            {this.props.currentWeather}°
          </Text>
        </View>
      </View>
    );
  };

  // componentWillMount() {
  //   this.props.requestFeedData(this.state.page);
  // }

  handleLoadMore = () => {
    // console.log("FeedList handleLoad More WORKING");
    if (this.state.propsRevieved === true) {
      this.setState(
        {
          page: this.state.page + 1,
          propsRevieved: false
        },
        () => {
          this.props.requestFeedData(
            this.state.page,
            this.state.test_data,
            this.props.deviceLocation
          );
        }
      );
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        refreshing: true,
        propsRevieved: false
      },
      () => {
        this.props.requestFeedData(
          this.state.page,
          this.state.test_data,
          this.props.deviceLocation
        );
      }
    );
  };

  componentWillReceiveProps() {
    //Once new props come stop loading
    // console.log("componentWillReceiveProps");
    this.setState({ refreshing: false, propsRevieved: true });
  }

  render() {
    // console.log("FEED LIST Data", this.props.feedData);

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.feedData}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={2}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    deviceLocation: state.deviceLocReducer.deviceLocation,
    feedData: state.feedReducer.feedData,
    feedTestData: state.feedReducer.feedTestData,
    currentWeather: state.weatherReducer.currentWeather,
    currentWeatherIcon: state.weatherReducer.currentWeatherIcon,
    currentCity: state.weatherReducer.currentCity
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFeedData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedList);
