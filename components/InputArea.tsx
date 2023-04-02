import React from 'react';
import { Textarea } from '@chakra-ui/react';

function InputArea() {
  return (
    <div>
      <Textarea
        placeholder="Here is a sample placeholder"
        w="500px"
        h="200px"
        resize="none"
      />
    </div>
  );
}

export default InputArea;
