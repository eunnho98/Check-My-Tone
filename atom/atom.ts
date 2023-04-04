import { atom } from 'recoil';

export const iconType = atom({
  key: 'icon',
  default: 'circle',
});

export const midiValue = atom({
  key: 'midi',
  default: 0,
});

export const pitchArray = atom<number[]>({
  key: 'pitchArray',
  default: [],
});
