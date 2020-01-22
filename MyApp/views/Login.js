import React from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage, } from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";
import {login, register} from "../hooks/APIHooks";

const Login = (props) => { // props is needed for navigation
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleNameChange,
    handleEmailChange,} = useSignUpForm();

  const signInAsync = async () => {
    const result = await login(inputs);
    await AsyncStorage.setItem('userToken', result.token);
    await AsyncStorage.setItem('userInfo', JSON.stringify(result.user));
    props.navigation.navigate('App');
  };

  const registerInAsync = async () => {
    const result = await register(inputs);
    console.log(result);
    await signInAsync();
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View style={styles.form}>
        <FormTextInput
          onChangeText={handleUsernameChange}
          autoCapitalize='none'
          placeholder='username'
        />
        <FormTextInput
          onChangeText={handlePasswordChange}
          autoCapitalize='none'
          placeholder='password'
          secureTextEntry={true}
        />
        <Button title="Sign in" onPress={signInAsync} />
      </View>
      <Text>Register</Text>
      <View style={styles.form}>
        <FormTextInput
          onChangeText={handleUsernameChange}
          autoCapitalize='none'
          placeholder='username'
        />
        <FormTextInput
          onChangeText={handlePasswordChange}
          autoCapitalize='none'
          placeholder='password'
          secureTextEntry={true}
        />
        <FormTextInput
          onChangeText={handleEmailChange}
          autoCapitalize='none'
          placeholder='email'
        />
        <FormTextInput
          onChangeText={handleNameChange}
          autoCapitalize='none'
          placeholder='full name'
        />
        <Button title="Register" onPress={registerInAsync} />
      </View>
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

// proptypes here

export default Login;
