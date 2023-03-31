import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import { Box, Button, Text, Heading, Icon, IconProps } from '@chakra-ui/react';
import Piano from '@/components/Piano';
import { PianoKeyboard } from '@/components/Piano2';
import PianoKey from '@/components/PianoKey';

const Home: NextPage = () => {
  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode();

  const CircleIcon = (props: IconProps) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  return (
    <div>
      <Heading textAlign="center" mt="20px" fontSize="6xl">
        내 목소리는 무슨 음을 낼까요?
      </Heading>
      <IconButton
        position="absolute"
        top="1rem"
        right="1rem"
        aria-label="Toggle Mode"
        onClick={toggleColorMode}
      >
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
      <Button w="96px" height="96px">
        <CircleIcon boxSize={14} color="red.500" />
      </Button>

      <Piano />
    </div>
  );
};

export default Home;
