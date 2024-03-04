import { AtomEffect, atom, atomFamily } from 'recoil';

export const modalAtomFamily = atomFamily({
  key: 'modalAtomFamily',
  default: false,
});

export const userAtom = atom({
  key: 'userAtom',
  default: '',
});

const localStorage = typeof window !== 'undefined' ? window.localStorage : null;
const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage && localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) return localStorage && localStorage.removeItem(key);

      return localStorage && localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const searchKeywordAtom = atom<string[]>({
  key: 'searchKeywordAtom',
  default: [],
  effects: [localStorageEffect<string[]>('keyword')],
});
