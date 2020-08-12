import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ScrollView
} from "react-native";
import { requestFeedData } from "../redux/actions";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "react-native-vector-icons/Ionicons";
import FastImage from "react-native-fast-image";
import upperCaseFirst from "upper-case-first";

const { width, height } = Dimensions.get("window");

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      test_data: true,
      zip_code: 90034
      // device_lat: 34.024818

      // device_coordinates: deviceCoordinates
    };
  }

  toggleFeedData = () => {
    console.log("Toggle Feed Data");
    if (this.state.test_data === true) {
      this.props.requestFeedData(
        this.state.page,
        this.state.test_data,
        this.props.deviceLocation
      );
      this.setState({ test_data: false });
    } else {
      this.props.requestFeedData(
        this.state.page,
        this.state.test_data,
        this.props.deviceLocation
      );
      this.setState({ test_data: true });
    }
  };

  render() {
    // console.log("Profile Device Location", this.props.deviceLocation);
    const first_name = this.props.firstName;
    const last_name = this.props.lastName;
    const image = this.props.image;

    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <FastImage
            source={{
              uri: image,
              priority: FastImage.priority.normal
            }}
            style={styles.image}
            borderRadius={60}
            resizeMode="cover"
          />
          <Text style={styles.name}>
            {upperCaseFirst(first_name) + " " + upperCaseFirst(last_name)}
          </Text>
        </View>
        <View style={styles.menuList}>
          <View style={styles.horizontalLine} />
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={0.6}
            onPress={() => console.log("pressed")}
          >
            <Text style={styles.listItem}>Manage Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={0.6}
            onPress={() => console.log("pressed")}
          >
            <Text style={styles.listItem}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={0.6}
            onPress={() => console.log("pressed")}
          >
            <Text style={styles.listItem}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={0.6}
            onPress={() => this.toggleFeedData()}
          >
            <Text style={styles.listItem}>Switch Feed</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <TouchableOpacity
            underlayColor={"#fff"}
            activeOpacity={0.6}
            onPress={() => console.log("pressed")}
          >
            <Text style={styles.listItem}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  menuList: {
    flexDirection: "column",
    marginBottom: "$marginBottom"
  },
  horizontalLine: {
    // height: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: width / 7,
    marginVertical: 20
  },
  listItem: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "$primaryFontWeightMedium",
    color: "$primaryTextBlack",
    paddingVertical: 15
    // marginVertical: 15
  },
  header: {
    // flex: 1,
    paddingTop: 20,
    marginTop: "$headerHeight",
    paddingBottom: 10
    // height: 800
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 10,
    justifyContent: "center",
    backgroundColor: "#FFF"
    // marginHorizontal: 15,
    // marginVertical: 15,
    // borderWidth: 1,
    // borderColor: "$primaryTextBlack"
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    // justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 15
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
    // backgroundColor: "green"
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
    // backgroundColor: "orange"
  },
  list: {
    flex: 1
    // backgroundColor: "#FFF"
  },
  separatorOuter: {
    backgroundColor: "white",
    height: StyleSheet.hairlineWidth,
    // height: 0.5,
    flex: 1
  },
  separator: {
    backgroundColor: "#bbb",
    // height: StyleSheet.hairlineWidth,
    height: 0.5,
    marginLeft: 15
  },

  footerItem: {
    fontSize: 18,
    fontWeight: "$primaryFontWeightThin",
    textAlign: "center",
    color: "$primaryTextBlack"
  },
  icons: {
    color: "$primaryTextBlack",
    paddingTop: 3
  },
  arrowIcon: {
    color: "#BBB"
    // paddingTop: 3
  },
  image: {
    height: 120,
    width: 120,
    // flex: 1,
    // width: "100%",
    // height: "60%",
    alignSelf: "center"
    // borderWidth: 2,
    // borderRadius: 60
    // backgroundColor: "#ddd"
  },
  name: {
    fontSize: 27,
    fontWeight: "$primaryFontWeightMedium",
    paddingTop: 12,
    textAlign: "center",
    color: "$primaryBrandColor"
  }
});

const mapStateToProps = state => {
  return {
    deviceLocation: state.deviceLocReducer.deviceLocation,
    locData: state.deviceLocReducer.region,
    userData: state.userReducer.userData,
    firstName: state.userReducer.firstName,
    lastName: state.userReducer.lastName,
    image: state.userReducer.image
    // firstName: state.userReducer.userData.firstName,
    // lastName: state.userReducer.userData.lastName,
    // image: state.userReducer.userData.image
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ requestFeedData }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
