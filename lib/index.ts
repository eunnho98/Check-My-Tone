import { useRecoilValue } from 'recoil';
import { pitchArray } from '@/atom/atom';

export function pitchToMidi(pitch: number) {
  const midiNumber = 69 + 12 * Math.log2(pitch / 440);

  return Math.round(midiNumber);
}

export function getMostMidi() {
  const pitchArr = useRecoilValue(pitchArray);
  const frequencies: { [key: number]: number } = {};
  let maxFrequency = 0;
  let mostFrequentPitch = null;

  for (const pitch of pitchArr) {
    if (pitch) {
      frequencies[pitch] = (frequencies[pitch] || 0) + 1;
      if (frequencies[pitch] > maxFrequency) {
        maxFrequency = frequencies[pitch];
        mostFrequentPitch = pitch;
      }
    }
  }
  return mostFrequentPitch;
}
