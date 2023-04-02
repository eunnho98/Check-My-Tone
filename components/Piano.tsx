import { Box } from '@chakra-ui/react';
import { useState } from 'react';

type PianoKeyProps = {
  isBlackKey: boolean;
  octave: number;
  note: string;
};

const PianoKey = ({ isBlackKey, octave, note }: PianoKeyProps) => {
  const color = isBlackKey ? 'black' : 'white';
  const size = isBlackKey ? 26 : 36;
  const label = `${note}${octave}`;

  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <Box
      border="1px solid black"
      bg={isPressed ? 'gray.500' : color}
      w={`${size}px`}
      h={`${size * 4}px`}
      mr={`${isBlackKey ? -15 : 0}px`}
      ml={`${isBlackKey ? -15 : 0}px`}
      zIndex={`${isBlackKey ? 2 : 0}`}
      display="flex"
      alignItems="flex-end"
      justifyContent="center"
      borderRadius={`${isBlackKey ? '0 0 8px 8px' : '8px'}`}
      boxShadow={`${isBlackKey ? 'none' : 'md'}`}
      color={`${isBlackKey ? 'white' : 'black'}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      cursor="pointer"
    >
      <Box fontSize={`${isBlackKey ? 12 : 18}px`} fontWeight="bold">
        {label}
      </Box>
    </Box>
  );
};

const Piano = () => {
  const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];
  const octaves = [1, 2, 3];
  const keys = [];

  for (let octave of octaves) {
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      const isBlackKey = [1, 3, 6, 8, 10].includes(i);
      keys.push(
        <PianoKey
          key={`${note}${octave}`}
          isBlackKey={isBlackKey}
          octave={octave}
          note={note}
        />,
      );
    }
  }

  return <Box display="flex">{keys}</Box>;
};

export default Piano;
