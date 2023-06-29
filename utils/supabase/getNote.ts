import { supabase } from './supabase';

export async function getNote(id: number) {
  const { data, error } = await supabase.from('note_list').select().eq('n_id', id);

  if (error) {
    console.error(error);
    throw new Error('노트 조회 실패!');
  }

  return data[0];
}
