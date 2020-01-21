import React from 'react';
import {StyleSheet, View, Text, Image, } from 'react-native';

const Single = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{(navigation.getParam("title", "no title"))}</Text>
      <Text style={styles.postText}>{navigation.getParam("text", "no text")}</Text>
      <Image style={styles.image}
        source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + navigation.getParam("fileName", "no picture")}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: "100%",
    height: null,
    resizeMode: "contain",
  },
  titleText: {
    paddingTop: 40,
    fontSize: 40,
    color: "#cd853a",
    fontWeight: "bold",
  },
  postText: {
    paddingTop: 20,
  }
});

export default Single;
