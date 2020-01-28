import React, {useEffect} from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, } from 'react-native';
import { Container } from "native-base";

const bootstrapAsync = async (props) => {
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    console.log('token', userToken);
    props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  useEffect(() => {
    getToken();
  }, []);
};

const AuthLoading = (props) => {
  bootstrapAsync(props);
  return (
    <Container>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </Container>
  );
};

export default AuthLoading;
