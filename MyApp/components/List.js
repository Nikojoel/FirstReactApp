import React, { useContext, useEffect } from "react";
import {FlatList} from "react-native";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIHooks";

const List = () => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();

  useEffect(() => {
    console.log(data);
    setMedia(data);
  }, [loading]);

  return (
    <FlatList
      data={media}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
