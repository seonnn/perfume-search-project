import { atom, atomFamily } from 'recoil';

export const modalAtomFamily = atomFamily({
  key: 'modalAtomFamily',
  default: false,
});

export const userAtom = atom({
  key: 'userAtom',
  default: '',
});
