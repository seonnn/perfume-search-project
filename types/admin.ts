interface PerfumeNote {
  perfumeNoteId: number | null;
  noteId: number;
}

export interface SelectedNoteList {
  [key: string]: number[];
  t: number[];
  m: number[];
  b: number[];
}

export interface ImageState {
  imageFile: File | null;
  imageSrc: string;
  imageUrl: string;
}
