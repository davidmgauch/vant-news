import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import { StatusBarCustom } from "../StatusBarCustom";
import { StatusBarDark } from "../StatusBarDark";

import styles from "./styles";

class ArticleHeader extends Component {
  render() {
    // console.log("Article Header props", this.props);
    const { source_name, navigation, image } = this.props;
    // const { source_name, navigation } = this.props.data;

    return (
      <View>
        {image && (
          <View
            // colors={[
            //   "rgba(0, 0, 0, 0.5)",
            //   "rgba(0, 0, 0, 0.4)",
            //   "rgba(0, 0, 0, 1)"
            // ]}
            style={styles.containerOuter}
          >
            <View style={styles.containerInner}>
              <TouchableWithoutFeedback
                onPress={() => navigation.goBack(null)}
                // onPress={() => console.log(this.props)}
              >
                <View style={styles.iconContainer}>
                  <IconSimple
                    name="arrow-left"
                    size={20}
                    style={styles.leftIcon}
                  />
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.titleContainer}>
                {/* <Text style={styles.text}>{source_name}</Text> */}
              </View>
              {/* <Icon name="md-more" size={22} style={styles.rightIcon} /> */}
            </View>
          </View>
        )}
        {!image && (
          <View>
            <View style={styles.containerOuterNoImage}>
              <View style={styles.containerInner}>
                <TouchableWithoutFeedback
                  onPress={() => navigation.goBack(null)}
                >
                  <View style={styles.iconContainerAlt}>
                    <IconSimple
                      name="arrow-left"
                      size={20}
                      style={styles.leftIcon}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.titleContainer}>
                  <Text style={styles.text}>{source_name}</Text>
                </View>
                <View style={styles.iconContainer} />
                {/* <Icon name="md-more" size={22} style={styles.rightIcon} /> */}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

// ArticleHeader.propTypes = {
//   onPress: PropTypes.func
// };

export default ArticleHeader;
