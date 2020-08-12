import React, { Component } from "react";
import { View, Text } from "react-native";

class LocationCardsContainer extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#67C8F3"
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
          Location Cards
        </Text>
      </View>
    );
  }
}

export default LocationCardsContainer;
