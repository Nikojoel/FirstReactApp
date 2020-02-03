import React from 'react';
import {Text, Button, Form, Body, Item, Container,} from "native-base";
import {Image} from 'react-native';
import FormTextInput from "../components/FormTextInput";
import useUploadForm from "../hooks/UploadHooks";

const Upload = () => {
  const {
    inputs,
    handleTextChange,
    handleTitleChange,
  } = useUploadForm();

  return (
    <Container>
      <Form>
        <Item style={{borderColor: "transparent"}}>
          <Body>
            <Text style={{fontWeight: "bold", fontSize: 30,}}>Upload</Text>
          </Body>
        </Item>
        <FormTextInput
          placeholder='title'
          onEndEditing={handleTitleChange}
        />
        <FormTextInput
          placeholder='text'
          onEndEditing={handleTextChange}
        />
        <Button primary dark>
          <Body>
            <Text style={{color: "white"}}>Select</Text>
          </Body>
        </Button>
        <Button primary>
          <Body>
            <Text style={{color: "white"}}>Upload</Text>
          </Body>
        </Button>
      </Form>
    </Container>
  );
};



export default Upload;
