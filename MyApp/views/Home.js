import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text, } from 'react-native';
import List from "../components/List";

const Home = (props) => {
  const {navigation} = props;
  return (
    <View>
      <Image
        style={main.picture}
        source={require("../public/img/dog.jpg")}/>
      <Text style={main.picText}>Pomeraniann</Text>
      <List navigation={navigation}/>
    </View>
  );
};

const main = StyleSheet.create ({
  picture: {
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").width * 0.5,
    marginBottom: 5,
  },
  picText: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    left: 35,
    top: 85,
  }
});

export default Home;
