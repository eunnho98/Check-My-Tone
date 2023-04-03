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
  soundfont: SoundFont.Player | undefined;
};

const PianoKey = ({
  isBlackKey,
  octave,
  note,
  audioContext,
  soundfont,
}: PianoKeyProps) => {
  const color = isBlackKey ? 'black' : 'white';
  const size = isBlackKey ? 26 : 36;
  const label = `${note}${octave}`;

  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = async (tone: string) => {
    setIsPressed(true);
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    if (soundfont) {
      soundfont.play(tone, audioContext.currentTime, {
        duration: 10, // 음표 재생 시간
        gain: 2, // 볼륨 설정
        sustain: 10, // 누르고 있는 상태 유지 시간
      });
    }
  };

  const handleMouseUp = async () => {
    setIsPressed(false);
    if (soundfont) {
      soundfont.stop();
    }
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
      boxShadow={`${isBlackKey ? 'none' : 'lg'}`}
      color={`${isBlackKey ? 'white' : 'black'}`}
      onMouseDown={() => handleMouseDown(label)}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
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
  const [soundfont, setSoundFont] = useState<SoundFont.Player>();

  // 마우스를 떼면 소리가 바로 끝나도록
  // async로 생성해서 전달 -> 소리가 바로남
  useEffect(() => {
    const initialSoundFont = async () => {
      const sf = await SoundFont.instrument(
        audioContext,
        'acoustic_grand_piano',
      );
      setSoundFont(sf);
    };

    initialSoundFont();
  }, []);
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
          soundfont={soundfont}
        />,
      );
    }
  }

  return <Box display="flex">{keys}</Box>;
};

export default Piano;
