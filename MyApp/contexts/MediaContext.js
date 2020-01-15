import React, { useState, useEffect }  from 'react';
import PropTypes from 'prop-types';
import { getAllMedia } from "../hooks/APIHooks";

const MediaContext = React.createContext([{}, media => {}]);

const MediaProvider = (props) => {
  const [media, setMedia] = useState();
  const [data, loading] = getAllMedia();

  useEffect(() => {
    console.log(data);
    setMedia(data);
  }, [loading]);

  return (
    <MediaContext.Provider value={[media, setMedia]}>
      {props.children}
    </MediaContext.Provider>
  );
};

MediaProvider.propTypes = {
  children: PropTypes.node,
};

export {MediaContext, MediaProvider};

