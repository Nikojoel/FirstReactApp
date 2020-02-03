import { useState, } from "react";

const useUploadForm = () => {
  const [inputs, setInputs] = useState({});

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

  return {
    handleTitleChange,
    handleTextChange,
    inputs,
  };
};

export default useUploadForm;
