export function pitchToMidi(pitch: number) {
  const midiRef = 69; // A4 MIDI 값
  const aFrequency = 440; // A4의 주파수

  const distance = 12 * (Math.log2(pitch) - Math.log2(aFrequency));
  const midiValue = Math.round(midiRef + distance);

  return midiValue;
}
