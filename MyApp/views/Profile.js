import React, {useEffect, useState } from 'react';
import {AsyncStorage, Image, Dimensions, StyleSheet} from 'react-native';
import { Container, Text, Button, CardItem, Body, Card, Content} from "native-base";
import {Icon} from "native-base";

const getUser = () => {
  const [info, setUser] = useState([]);
  const user = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    setUser(JSON.parse(userInfo));
  };
  useEffect(() => {
    user();
  }, []);
  return info;
};

const Profile = (props) => {
  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };
  const user = getUser();
  console.log(user);
  return (
    <Container>
      <Content>
      <Card>
      <CardItem bordered>
        <Icon name="person"/>
        <Text>Username: {user.username}</Text>
      </CardItem>
        <Body>
      <CardItem>

        <Image style={styles.image}
                      source={{uri: "http://media.mw.metropolia.fi/wbma/uploads/" + user.profPic}}
        />
      </CardItem>
        </Body>
        <CardItem bordered>
          <Text>Fullname: {user.full_name}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>Email: {user.email}</Text>
        </CardItem>

        <CardItem>
          <Button style={{flex: 1,}}primary onPress={signOutAsync}>
            <Body>
              <Text style={{color: "white"}}>Logout</Text>
            </Body>
          </Button>
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
});

export default Profile;
