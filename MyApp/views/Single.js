import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Dimensions, } from 'react-native';
import { Text, Body, Card, CardItem, Container, Content, } from "native-base";
import { Video } from "expo-av";
import { Icon } from "native-base";
import { getUser } from "../hooks/APIHooks";


const Single = (props) => {
  const {navigation} = props;
  const type = navigation.state.params.fileType;

  const [user, setUser] = useState({});
  const getUserName = async () => {
    const user = await getUser(navigation.state.params.userId);
    setUser(user);
  };
  useEffect(() => {
    getUserName();
  }, []);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem bordered>
            <Icon name="person"/>
            <Text>by {user.username}</Text>
          </CardItem>
          <Body>
            <Text style={styles.desc}>{navigation.state.params.title}</Text>
            <CardItem>
              {type === "image" &&
              <Image
                style={styles.image}
                source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + navigation.state.params.fileName}}
              />
              }
              {type === "video" &&
              <Video
                source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + navigation.state.params.fileName}}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: 300, height: 300 }}
              />
              }
            </CardItem>
          </Body>
          <CardItem bordered>
            <Icon name="image"/>
            <Text style={styles.text}>{navigation.state.params.text}</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
  desc: {
    fontSize: 25,
  },
});

export default Single;
