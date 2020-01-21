import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.background} onPress={() => {
      props.navigation.push("Single", {
        fileName: props.singleMedia.thumbnails.w160,
        title: props.singleMedia.title,
        text: props.singleMedia.description,
      });
    }}>
      <Image style={styles.image}
        source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + props.singleMedia.thumbnails.w160}}
      />
      <View style={styles.view}>
        <Text style={styles.desc}>{props.singleMedia.title}</Text>
        <Text style={styles.txt}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create ({
  background: {
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    borderWidth: 1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.3,
    elevation: 10,
  },
  image: {
    width: 200,
    height: 200,
    flex: 1,
    borderRadius: 100,
    overflow: "hidden",
  },
  view: {
    flex: 1,
    marginLeft: 5,
  },
  desc: {
    color: "#cd853a",
    fontSize: 35,
    fontWeight: "bold",
  },

  txt: {
    fontSize: 20,
    marginTop: 5,
    marginLeft: 5,
  },

});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
