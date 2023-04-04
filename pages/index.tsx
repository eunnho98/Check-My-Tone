import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useColorMode } from '@chakra-ui/color-mode';
import React from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import { Text, Heading, VStack } from '@chakra-ui/react';

const Piano = dynamic(() => import('@/components/Piano'), { ssr: false });
const Record = dynamic(() => import('@/components/Record'), { ssr: false });

const Home: NextPage = () => {
  // hook which help us to toggle the color modes
  const { colorMode, toggleColorMode } = useColorMode();

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
        <Record />
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          주위 소음을 차단해주세요!
        </Text>
      </VStack>
    </div>
  );
};

export default Home;
