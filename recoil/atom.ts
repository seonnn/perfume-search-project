import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export const modalAtomFamily = atomFamily({
  key: 'modalAtomFamily',
  default: false,
});

const { persistAtom } = recoilPersist({ key: 'userAtom', storage: localStorage });

export const userAtom = atom({
  key: 'userAtom',
  default: '',
  effects_UNSTABLE: [persistAtom],
});
