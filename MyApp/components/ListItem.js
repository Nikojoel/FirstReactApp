import {Image, StyleSheet, Dimensions} from "react-native";
import {Button, ListItem as Item, Left, Body, Content, Text,} from "native-base";
import React from "react";
import PropTypes from "prop-types";
import {deleteFile} from "../hooks/APIHooks";

const ListItem = (props) => {
  return (
    <Item>
      <Left>
        <Image style={styles.image}
               source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + props.singleMedia.thumbnails.w160}}
        />
        <Body>
          <Text style={styles.desc}>{props.singleMedia.title}</Text>
          <Text numberOfLines={1}>{props.singleMedia.description}</Text>
        </Body>
      </Left>
        <Button primary rounded onPress={() => {
          props.navigation.push("Single", {
            fileName: props.singleMedia.filename,
            title: props.singleMedia.title,
            text: props.singleMedia.description,
            fileType: props.singleMedia.media_type,
            userId: props.singleMedia.user_id,
          });
        }}>
          <Text>View</Text>
        </Button>
      {props.navigation.state.routeName === "MyFiles" &&
        <Content>
          <Body>
        <Button warning rounded onPress={() => {
          props.navigation.push("Update", {
            fileName: props.singleMedia.filename,
            file_id: props.singleMedia.file_id,
          })
        }}>
          <Text>Edit</Text>
        </Button>
        <Button danger rounded onPress={async () => {
          await deleteFile(props.singleMedia.file_id);
        }}>
          <Text>Drop</Text>
        </Button>
          </Body>
        </Content>
      }
    </Item>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    margin: 5,
  },
  desc: {
    fontSize: 25,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
