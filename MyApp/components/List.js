import React, { useContext, useEffect } from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import { MediaContext } from "../contexts/MediaContext";
import { getAllMedia } from "../hooks/APIHooks";
import { List as BaseList } from "native-base";

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();

  useEffect(() => {
    setMedia(data);
  }, [loading]);
  return (
    <BaseList
      dataArray={media}
      renderRow={
        (item) => <ListItem
          navigation={props.navigation}
          singleMedia={item}
        />
      }
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

List.propTypes = {
  mediaArray: PropTypes.array,
};

export default List;
