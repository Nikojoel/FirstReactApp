import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useSignUpForm from "../hooks/LoginHooks";
import {getProfPic, login, register, checkUserName} from "../hooks/APIHooks";
import {Text, Button, Form, Body, Item, Container, Right, Label } from "native-base";

const Login = (props) => { // props is needed for navigation
  const {
    inputs,
    valid,
    handleUsernameChange,
    handlePasswordChange,
    handleNameChange,
    handleEmailChange,
    validatePassword,
    validateInput,
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

  const [isRegistered, setRegister] = useState(true);
  const [isTaken, setTaken] = useState(false);
  console.log(valid);
  return (
    <Container>
      {isRegistered ? (
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
              <Text style={{color: "white"}}>Login</Text>
            </Body>
          </Button>
          <Button dark onPress={() => {setRegister(false)}}>
            <Body>
              <Text style={{color: "white"}}>Not registered?</Text>
            </Body>
          </Button>
        </Form>
      ) : (
        <Form>
          <Item style={{borderColor: "transparent"}}>
            <Body>
              <Text style={{fontWeight: "bold", fontSize: 30,}}>Register</Text>
            </Body>
          </Item>
          <Item style={{borderColor: "transparent"}}>
            <Right>
              <FormTextInput
                onChangeText={handleUsernameChange}
                autoCapitalize='none'
                placeholder='username'
                onEndEditing={async (evt) => {
                  validateInput("username", inputs.username);
                  const text = evt.nativeEvent.text;
                  const result = await checkUserName(text);
                  console.log(result);
                  if (result.available === true) {
                    setTaken(false);
                  } else {
                    setTaken(true);
                  }
                }
                }
              />
            </Right>
            {isTaken &&
            <Label style={{color: "red"}}>Username taken</Label>
            }
            {valid.username &&
            <Label style={{color: "red"}}>{valid.username}</Label>
            }
          </Item>
          <Item style={{borderColor: "transparent"}}>
            <Right>
              <FormTextInput
                onChangeText={handlePasswordChange}
                onEndEditing={validateInput("password", inputs.password)}
                autoCapitalize='none'
                placeholder='password'
                secureTextEntry={true}
              />
              <FormTextInput
                onEndEditing={validatePassword}
                autoCapitalize='none'
                placeholder='retype password'
                secureTextEntry={true}
              />
            </Right>
            {valid.password &&
            <Label style={{color: "red"}}>{valid.password}</Label>
            }
            {valid.confirmPassword &&
            <Label style={{color: "red"}}>{valid.confirmPassword}</Label>
            }
          </Item>
          <FormTextInput
            onChangeText={handleNameChange}
            autoCapitalize='none'
            placeholder='full name'
          />
          <Item style={{borderColor: "transparent"}}>
            <Right>
              <FormTextInput
                onChangeText={handleEmailChange}
                onEndEditing={validateInput("email", inputs.email)}
                autoCapitalize='none'
                placeholder='email'
              />
            </Right>
            {valid.email &&
            <Label style={{color: "red"}}>{valid.email}</Label>
            }
          </Item>
          <Button primary onPress={registerInAsync}>
            <Body>
              <Text style={{color: "white"}}>Register</Text>
            </Body>
          </Button>
          <Button dark onPress={() => {setRegister(true)}}>
            <Body>
              <Text style={{color: "white"}}>Already registered?</Text>
            </Body>
          </Button>
        </Form>
      )}
    </Container>
  );
};

// proptypes here

export default Login;
