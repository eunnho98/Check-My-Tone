import { Box } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import SoundFont from 'soundfont-player';

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

type PianoKeyProps = {
  isBlackKey: boolean;
  octave: number;
  note: string;
  audioContext: AudioContext;
};

const PianoKey = ({
  isBlackKey,
  octave,
  note,
  audioContext,
}: PianoKeyProps) => {
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

  // make sound
  const handleClick = async (tone: string) => {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    const soundfont = await SoundFont.instrument(audioContext, 'clavinet');
    soundfont.play(tone);
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
      onClick={() => handleClick(label)}
      cursor="pointer"
    >
      <Box fontSize={`${isBlackKey ? 12 : 18}px`} fontWeight="bold">
        {label}
      </Box>
    </Box>
  );
};

const Piano = () => {
  // make audioContext
  // PianoKey에서 초기화하면 계속 초기화돼서 24번밖에 소리가 안나옴
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContext();

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
  const octaves = [2, 3, 4];
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
          audioContext={audioContext}
        />,
      );
    }
  }

  return <Box display="flex">{keys}</Box>;
};

export default Piano;
