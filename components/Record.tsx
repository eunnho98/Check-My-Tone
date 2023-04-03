import React, { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}
function Record() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let audioBuffer: AudioBuffer;
  let audioSource: AudioBufferSourceNode;
  let recorder: MediaStreamAudioDestinationNode;
  let mediaStream: MediaStream;

  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    // getUserMedia API를 사용하여 사용자의 마이크 입력을 가져옴
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(stream);
      } catch (error) {
        console.log(error);
      }
    };
    getUserMedia();
  }, []);

  useEffect(() => {
    if (stream) {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      const analyser = audioContext.createAnalyser();

      // 처리된 입력을 출력할 AudioContext의 출력 노드 생성
      const destination = audioContext.destination;

      // 처리된 입력을 출력하는 노드 생성
      source.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(destination);

      // 실시간으로 처리된 입력을 출력
      const visualize = () => {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        // dataArray를 사용하여 원하는 방식으로 시각화
        // 여기서는 콘솔에 출력
        console.log(dataArray);

        requestAnimationFrame(visualize);
      };
      visualize();
    }
  }, [stream]);

  return (
    <div>
      <p>Record</p>
    </div>
  );
}

export default Record;
