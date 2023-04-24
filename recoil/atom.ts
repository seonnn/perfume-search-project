import { atom } from 'recoil';

export interface SearchParamsKey {
  [key: string]: number[] | undefined;
  note: number[];
  brand: number[];
}

export const searchParamsAtom = atom<SearchParamsKey>({
  key: 'searchParamsAtom',
  default: { note: [], brand: [] },
});
