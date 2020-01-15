import React from 'react';
import {View,} from 'react-native';
import List from "./components/List";
import { MediaProvider } from "./contexts/MediaContext";

const App = () => {
  return (
    <View style={{marginTop: 40}}>
      <MediaProvider>
        <List/>
      </MediaProvider>
    </View>
  );
};

export default App;
