import type { NextPage } from 'next';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import {
  Button,
  Text,
  Heading,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Piano from '@/components/Piano';
import InputArea from '@/components/InputArea';
import MyIcon from '@/components/common/MyIcon';
import { useRecoilState } from 'recoil';
import { iconType } from '../atom/atom';

const Home: NextPage = () => {
  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode();
  const [icon, setIcon] = useRecoilState(iconType);
  const squareColor = useColorModeValue('gray.600', 'gray.200');

  return (
    <div>
      <Heading
        textAlign="center"
        mt="20px"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        내 목소리는 무슨 음을 낼까요?
      </Heading>
      <Text textAlign="center" fontSize="3xl" mt="1rem" fontWeight="bold">
        녹음 버튼을 누르고 목소리를 들려주세요!
      </Text>
      <IconButton
        position="absolute"
        top={{ base: '5rem', md: '1rem' }}
        right="1rem"
        aria-label="Toggle Mode"
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>

      <VStack justify="center" spacing={20} mt="2rem">
        <Piano />
        <InputArea />
        <Button
          w="96px"
          h="96px"
          onClick={() => {
            if (icon === 'circle') {
              setIcon('square');
            } else {
              setIcon('circle');
            }
          }}
        >
          <MyIcon
            type={icon}
            boxSize={icon === 'circle' ? 16 : 12}
            color={icon === 'circle' ? 'red.400' : squareColor}
          />
        </Button>
      </VStack>
    </div>
  );
};

export default Home;
