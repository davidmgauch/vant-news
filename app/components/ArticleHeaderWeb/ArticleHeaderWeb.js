import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";

import styles from "./styles";

class ArticleHeaderWeb extends Component {
  render() {
    console.log("Article Header props", this.props);
    const { source_name, navigation } = this.props;
    // const { source_name, navigation } = this.props.data;
    return (
      <View style={styles.containerOuter}>
        <View style={styles.containerInner}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
            <View style={styles.iconContainerLeft}>
              <IconSimple name="arrow-left" size={20} style={styles.leftIcon} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>{source_name}</Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => console.log("more options icon pressed")}
          >
            <View style={styles.iconContainerRight}>
              <Icon name="md-more" size={22} style={styles.rightIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

// ArticleHeaderWeb.propTypes = {
//   onPress: PropTypes.func
// };

export default ArticleHeaderWeb;
