import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import PropTypes from "prop-types";

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.background}>
      <Image
        style={{ width: null, height: 160, flex: 1 }}
        source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + props.singleMedia.thumbnails.w160}}
      />
      <View style={{ flex: 1, marginLeft: 5}}>
        <Text style={{fontSize: 40, fontWeight: "bold"}}>{props.singleMedia.title}</Text>
        <Text style={{fontSize: 20}}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#8b8b8b',
    marginBottom: 10,
    flexDirection: 'row',
    paddingTop: 10,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
