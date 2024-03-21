'use server';
import { NoteListResponseData } from '@/types/response';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

interface PostNoteData {
  f_id: number;
  n_name: string;
}

export const postNote = async (requestData: Omit<NoteListResponseData, 'n_id'>) => {
  const { n_name, f_id } = requestData;
  const { data, error } = await createServerActionClient({ cookies })
    .from('note_list')
    .insert({ n_name, f_id })
    .select();

  if (error) {
    if (error.message.includes('duplicate')) return { status: 409, message: error.message };
    throw new Error('노트 등록 실패!');
  }

  return { status: 201, data };
};
