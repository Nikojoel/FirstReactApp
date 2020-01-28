import React from 'react';
import {StyleSheet, Image, Dimensions,} from 'react-native';
import {Item, Text, Body} from "native-base";

const Single = (props) => {
  const { navigation } = props;

  return (
    <Item style={{borderColor: "transparent"}}>
      <Body>
      <Image style={styles.image}
        source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + navigation.getParam("fileName", "no picture")}}
      />
        <Text style={styles.desc}>{navigation.getParam("title", "no title")}</Text>
        <Text style={styles.text}>{navigation.getParam("text", "no text")}</Text>
      </Body>
    </Item>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").width * 1,
  },
  desc: {
    fontSize: 25,
    margin: 5,
  },
  text: {
    marginLeft: 15,
    marginRight: 15,
  }
});

export default Single;
