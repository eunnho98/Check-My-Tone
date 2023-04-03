import React, { useEffect, useState } from 'react';
import * as Pitchfinder from 'pitchfinder';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { iconType } from '@/atom/atom';
import MyIcon from './common/MyIcon';
import { pitchToMidi } from '@/lib';

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}
function Record() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [icon, setIcon] = useRecoilState(iconType);
  const squareColor = useColorModeValue('gray.600', 'gray.300');
  const buttonColor = useColorModeValue('gray.300', 'gray.700');
  useEffect(() => {
    const getUserMedia = async () => {
      try {
        // record를 누르면
        if (isPressed) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          setStream(stream);
          // 종료
        } else {
          if (stream !== null) {
            stream.getTracks().forEach((track) => track.stop());
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserMedia();
  }, [isPressed]);

  useEffect(() => {
    let requestId: number;
    if (stream && isPressed) {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)(); // getUserMedia API를 사용하여 사용자의 마이크 입력을 가져옴

      // createMediaStreamSource(): media stream이 주어지면 오디오를 재생하고 조작할 수 있는 ac를 만듦
      const source = audioContext.createMediaStreamSource(stream);
      console.log('audio', audioContext);

      // 볼륨 조절을 할 수 있음
      const gainNode = audioContext.createGain();
      // 실시간 주파수의 정보를 표현(소리 시각화)
      const analyser = audioContext.createAnalyser();

      // 처리된 입력을 출력할 AudioContext의 출력 노드 생성
      const destination = audioContext.destination;

      // 처리된 입력을 출력하는 노드 생성
      // 노드들을 서로 연결, 연결 순서는 source -> gainNode -> destination
      source.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(destination);

      // 실시간으로 처리된 입력을 출력
      const visualize = () => {
        //  시각화를 위해 사용할 데이터 값의 수
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        // getByteTimeDomainData: 사용자가 마이크로 입력한 음성 데이터를 바이트 단위로 읽어와 처리 가능
        analyser.getByteTimeDomainData(dataArray);
        // * dataArray를 사용하여 원하는 방식으로 시각화
        // * pitch
        const detectPitch = Pitchfinder.YIN();
        const unitArray = Float32Array.from(dataArray);
        const getPitch = detectPitch(unitArray);

        requestId = requestAnimationFrame(visualize);
        if (getPitch) {
          const midi = pitchToMidi(getPitch);
          if (midi !== 133) {
            // 처음에 나오는 음 & G#5은 무시
            console.log('midi', midi);
          }
        }
      };
      visualize();
      // requestAnimationFrame 때문에 visualize()가 한 번만 호출되어도 계속 실행됨
      // 명시적으로 정지시켜야함
      return () => {
        cancelAnimationFrame(requestId);
      };
    }
  }, [stream, isPressed]);

  const startRecord = () => {
    setIsPressed((prev) => !prev);
  };

  return (
    <Button
      w="96px"
      h="96px"
      bgColor={buttonColor}
      onClick={() => {
        startRecord();
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
  );
}

export default Record;
