export interface PerfumeNote {
  perfumeNoteId?: number;
  noteId: number;
}

export interface SelectedNoteList {
  [key: string]: PerfumeNote[];
  t: PerfumeNote[];
  m: PerfumeNote[];
  b: PerfumeNote[];
}

export interface ImageState {
  imageFile: File | null;
  imageSrc: string;
  imageUrl: string;
}
