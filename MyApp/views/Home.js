import React from 'react';
import {Image, StyleSheet, Dimensions,} from 'react-native';
import List from "../components/List";
import {Text, Container} from "native-base";

const Home = (props) => {
  const {navigation} = props;
  return (
    <Container>
      <Image
        style={main.picture}
        source={require("../public/img/dog.jpg")}/>
      <Text style={main.picText}>Pomeranian</Text>
      <List navigation={navigation}/>
    </Container>
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
