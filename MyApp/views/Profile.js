import React, {useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage} from 'react-native';


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
    <View style={styles.container}>
      <Text>{user.username}'s profile</Text>
      <Text>{user.email}</Text>
      <Text>{user.full_name}</Text>
      <Button title="Logout!" onPress={signOutAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
