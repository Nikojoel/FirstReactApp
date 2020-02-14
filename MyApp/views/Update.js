import React, {useState, useEffect } from 'react';
import {Text, Button, Form, Body, Item, Container, Label, Right, } from "native-base";
import {Image, Dimensions, StyleSheet} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";
import {updatePost} from "../hooks/APIHooks";

const Update = (props) => {
  const {
    inputs,
    valid,
    handleTextChange,
    handleTitleChange,
    validateInput,
  } = useUploadForm();

  const [image, setImage] = useState(null);
  useEffect(() => {
    setImage("http://media.mw.metropolia.fi/wbma/uploads/" + props.navigation.state.params.fileName);
  },[]);

  return (
    <Container>
      <Form>
        <Item style={{borderColor: "transparent"}}>
          <Body>
            <Text style={{fontWeight: "bold", fontSize: 30,}}>Update</Text>
          </Body>
        </Item>
        <Item style={{borderColor: "transparent"}}>
          <Right>
            <FormTextInput
              value={inputs.title}
              placeholder='title'
              onChangeText={handleTitleChange}
              onEndEditing={() => validateInput("title", inputs.title)}
            />
          </Right>
          {valid.title &&
          <Label style={{color: "red"}}>{valid.title}</Label>
          }
        </Item>
        <Item style={{borderColor: "transparent"}}>
          <Right>
            <FormTextInput
              value={inputs.postText}
              placeholder='text'
              onChangeText={handleTextChange}
            />
          </Right>
        </Item>
        {!valid.title &&
        <Form>
          <Button warning onPress={async () => {
            await updatePost({
              title: inputs.title,
              text: inputs.postText,
              fileId: props.navigation.state.params.file_id});
          }}>
            <Body>
              <Text style={{color: "white"}}>Update</Text>
            </Body>
          </Button>
        </Form>
        }
      </Form>
      {image &&
      <Item>
        <Body>
          <Text style={{fontWeight: "bold", fontSize: 30,}}>Selected image</Text>
          <Image source={{uri: image}} style={styles.image}/>
        </Body>
      </Item>
      }
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width * 0.85,
    height: Dimensions.get("window").width * 0.85,
  },
});

export default Update;
