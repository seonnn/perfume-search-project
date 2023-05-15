import { atom, atomFamily } from 'recoil';

export interface SearchParamsKey {
  [key: string]: number[] | undefined;
  note: number[];
  brand: number[];
}

export const queryParamsAtom = atom<SearchParamsKey>({
  key: 'queryParamsAtom',
  default: { note: [], brand: [] },
});

export const modalAtomFamily = atomFamily({
  key: 'modalAtomFamily',
  default: false,
});
