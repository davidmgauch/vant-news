import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import styles from "./styles";

class HeaderCardItem extends Component {
  constructor(props) {
    super(props);
  }

  handleArticlePress(item) {
    console.log("pressed", item);
    // this.props.navigation.navigate("ArticleContainer", item);
  }

  render() {
    // console.log("FeedItem Props", this.props);
    const {
      title,
      image,
      source_name,
      location_city,
      article_link,
      navigation
    } = this.props;

    return <View style={styles.container} />;
  }
}

export default HeaderCardItem;
