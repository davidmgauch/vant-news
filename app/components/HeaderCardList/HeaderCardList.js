import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import styles from "./styles";

import Icon from "react-native-vector-icons/SimpleLineIcons";

import headerCardData from "../../lib/tempHeaderCardData";
// import { HeaderCardItem } from "../HeaderCardItem";

const { width, height } = Dimensions.get("window");

class HeaderCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1
    };
  }

  _renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback onPress={() => console.log("pressed")}>
        <View style={styles.cardView}>
          <Text style={styles.title}>{item.title}</Text>
          {/* <View style={styles.locationInfo}>
            <Text style={styles.city}>{item.city}</Text>
            <Text style={styles.state}>{item.state}</Text>
            <Text style={styles.zipCode}>{item.zip_code}</Text>
          </View>
          <View style={styles.cardActionButton}>
            <Text style={styles.action}>{item.action}</Text>
          </View> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.scrollView.scrollTo({ x: -30 });
    }, 1); // scroll view position fix
  }

  render() {
    // console.log(headerCardData);
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          style={styles.container}
          //pagingEnabled={true}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width - 60}
          scrollEventThrottle={20}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30
          }}
        >
          {/* <View style={styles.view} />
          <View style={styles.view2} />
          <View style={styles.view} />
          <View style={styles.view2} />
          <View style={styles.view} /> */}

          {headerCardData.map((item, i) => (
            <TouchableOpacity
              underlayColor={"#fff"}
              activeOpacity={1}
              key={item.id}
              onPress={() => console.log("Pressed")}
            >
              <View style={[styles.card, { backgroundColor: item.color }]}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.locationInfo}>
                  <Text style={styles.city}>{item.city}</Text>
                  <Text style={styles.state}>{item.state}</Text>
                  <Text style={styles.zipCode}>{item.zip_code}</Text>
                </View>
                <View style={styles.cardActionButton}>
                  <Text style={styles.action}>{item.action}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.addCard}>
            {/* <View style={styles.addCardContainer}>
              <Icon name="plus" size={50} style={styles.iconAdd} />
            </View> */}
            {/* <View style={styles.addCardContainer}> */}
            <Text style={styles.addCardTitle}>Add{"\n"}Location</Text>
            {/* </View>
            <View style={styles.addCardContainer} /> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     width: width,
//     height: height,
//     backgroundColor: "#081c2f"
//   },
//   title: {},
//   view: {
//     marginTop: 100,
//     backgroundColor: "blue",
//     width: width - 80,
//     margin: 10,
//     height: 500,
//     borderRadius: 10
//     //paddingHorizontal : 30
//   },
//   view2: {
//     marginTop: 100,
//     backgroundColor: "red",
//     width: width - 80,
//     margin: 10,
//     height: 500,
//     borderRadius: 10
//     //paddingHorizontal : 30
//   }
// });

export default HeaderCardList;
