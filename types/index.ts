export interface Fragrance {
  id: number;
  name: string;
}

export interface Note {
  id: number;
  name: string;
  fragranceId?: number;
}

export interface NoteList {
  fragranceId: number;
  noteList: Note[];
}

export interface PerfumeNoteList {
  topNote: Note[];
  middleNote: Note[];
  baseNote: Note[];
}

export interface Brand {
  b_id: number;
  b_name: string;
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
