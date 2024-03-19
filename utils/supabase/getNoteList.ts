import { FragranceNoteListResponseData } from '@/types/response';
import { supabase } from './supabase';

export async function getNoteList() {
  const { data, error } = await supabase
    .from('note_list')
    .select(
      `
      f_id,
      n_id,
      n_name
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

  return data;
}
