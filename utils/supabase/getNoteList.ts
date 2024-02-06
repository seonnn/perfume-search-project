import { FragranceNoteListResponseData } from '@/types/response';
import { supabase } from './supabase';

export async function getNoteList() {
  const { data, error } = await supabase
    .from('fragrance_list')
    .select(
      `
      f_id,
      note_list (
        n_id,
        n_name
      )
    `
    )
    .returns<FragranceNoteListResponseData[]>();

  if (error) {
    console.error(error);
    throw new Error('노트 조회 실패!');
  }

  if (!data || !data.length) {
    return [];
  }

  return data.map((note) => {
    const noteList = note.note_list.map((item) => {
      return { id: item.n_id, name: item.n_name, fragranceId: note.f_id };
    });

    return { fragranceId: note.f_id, noteList };
  });
}
