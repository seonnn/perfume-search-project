export interface Fragrance {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  name: string;
  fragranceId: number;
}

export interface AdminNote extends Fragrance {
  fragranceName: string;
}

export interface Brand extends Fragrance {}

export interface FragranceNoteList {
  fragranceId: number;
  noteList: Note[];
}

export interface PerfumeNoteList {
  topNote: Note[];
  middleNote: Note[];
  baseNote: Note[];
}

export interface Perfume {
  id: number;
  name: string;
  imgUrl: string;
  brand: string;
}

export interface PerfumeDetail {
  name: string;
  imgUrl: string;
  brandName: string;
  perfumeNoteList: PerfumeNoteList;
}
