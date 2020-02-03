import { useState } from 'react';
import validate from "validate.js";

const constraints = {
  username: {
    length: {
      minimum: 3,
      message: "^Minimum 3 characters",
    }
  },
  password: {
    length: {
      minimum: 5,
      message: "^Minimum 5 characters",
    },
  },
  email: {
    email: {
      message: "^Not valid email"
    }
  },
  confirmPassword: {
    equality: "password"
  }

};

const useSignUpForm = () => {
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

  const validatePassword = (text) => {
    if (text.nativeEvent.text !== inputs.password) {
      validateInput("confirmPassword", text);
    } else {
      validateInput("confirmPassword", undefined);
    }
  };

  const handleUsernameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
      }));
  };

  const handlePasswordChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
      }));
  };

  const handleEmailChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
      }));
  };

  const handleNameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        fullname: text,
      }));
  };

  return {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    handleNameChange,
    validatePassword,
    validateInput,
    inputs,
    valid,
  };
};

export default useSignUpForm;
