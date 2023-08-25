import { PerfumeNote } from '@/types/admin';

export const handleNoteList = (noteList: PerfumeNote[], id: number) => {
  const noteIdx = noteList.map((note) => note.noteId).findIndex((noteId) => noteId === id);
  const newNoteList = noteIdx > -1 ? noteList.filter((noteId, idx) => idx !== noteIdx) : [...noteList, { noteId: id }];
  return { noteIdx, newNoteList };
};
