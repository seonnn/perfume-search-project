export interface Fragrance {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  name: string;
  fragranceId: number;
}

export interface AdminNote extends Note {
  fragranceName: string;
}

export interface Brand extends Fragrance {}

export interface FragranceNoteList {
  fragranceId: number;
  noteList: Note[];
}

export interface PerfumeNoteList {
  topNote: Omit<Note, 'fragranceId'>[];
  middleNote: Omit<Note, 'fragranceId'>[];
  baseNote: Omit<Note, 'fragranceId'>[];
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
