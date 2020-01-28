import React from 'react';
import {AsyncStorage} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";
import {getProfPic, login, register} from "../hooks/APIHooks";
import {Text, Button, Form, Body, Item} from "native-base";

const Login = (props) => { // props is needed for navigation
  const {
    inputs,
    handleUsernameChange,
    handlePasswordChange,
    handleNameChange,
    handleEmailChange,
  } = useSignUpForm();

  const signInAsync = async () => {
    const result = await login(inputs);
    const user = await getProfPic(result.user.user_id);
    result.user.profPic = user[0].filename;
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
    <Form>
      <Item style={{borderColor: "transparent"}}>
        <Body>
          <Text style={{fontWeight: "bold", fontSize: 30,}}>Login</Text>
        </Body>
      </Item>
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
      <Button primary onPress={signInAsync}>
      <Body>
          <Text style={{color: "white"}}>Sign in</Text>
      </Body>
      </Button>
      <Item style={{borderColor: "transparent"}}>
        <Body>
          <Text style={{fontWeight: "bold", fontSize: 30}}>Register</Text>
        </Body>
      </Item>
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
      <Button primary onPress={registerInAsync}>
        <Body>
          <Text style={{color: "white"}}>Register</Text>
        </Body>
      </Button>
    </Form>
  );
};


// proptypes here

export default Login;
