import React from 'react';
import { Input, Item} from "native-base";

const FormTextInput = (props) => {
  const {style, ...otherProps} = props;
  return (
      <Item>
        <Input
          {...otherProps}
        />
      </Item>
  );
};

export default FormTextInput;
