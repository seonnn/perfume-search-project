'use server';
import { NoteListResponseData } from '@/types/response';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const putNote = async (requestData: NoteListResponseData) => {
  const { n_id, n_name, f_id } = requestData;

  const { data, error } = await createServerActionClient({ cookies })
    .from('note_list')
    .update({ n_name, f_id })
    .eq('n_id', n_id)
    .select();

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error('노트 수정 실패!');
  }

  return { status: 201, data };
};
