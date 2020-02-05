import { useState, } from "react";
import validate from "validate.js";
import {uploadImage} from "./APIHooks";

const constraints = {
  title: {
    length: {
      minimum: 5,
      message: "^Minimum 5 characters",
    }
  },
};

const useUploadForm = () => {
  const [inputs, setInputs] = useState({});
  const [valid, setValid] = useState({});

  const validateInput = (attr, value) => {
    const validated = validate({[attr]: value}, constraints);
    let valResult = undefined;
    if (validated) {
      valResult = validated[attr][0];
    }
    setValid((valid) =>
      ({
        ...valid,
        [attr]: valResult
      }));
  };

  const handleTitleChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        title: text,
      }));
  };
  const handleTextChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        postText: text,
      }));
  };
  const resetText = (attr, text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        [attr]: text,
      }));
  };

  const handleUpload = async (file) => {
    const filename = file.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    if (type === 'image/jpg') {
      type = 'image/jpeg'
    }
    const formData = new FormData();
    formData.append("file", {uri: file, name: filename, type});
    formData.append("title", inputs.title);
    if (inputs.postText === undefined) {
      formData.append("description", "");
    } else {
      formData.append("description", inputs.postText);
    }
    await uploadImage(formData);
  };

  return {
    handleTitleChange,
    handleTextChange,
    validateInput,
    handleUpload,
    inputs,
    valid,
    resetText,
  };
};

export default useUploadForm;
