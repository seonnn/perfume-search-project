'use server';
import { PerfumeNote, SelectedNoteList } from '@/types/admin';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export interface PostPerfumeRequestData {
  p_name: string;
  b_id: number;
  imgurl: string;
  selectedNoteList: SelectedNoteList;
}

export const postPerfume = async (data: PostPerfumeRequestData) => {
  const { p_name, b_id, imgurl, selectedNoteList } = data;
  const { data: perfume_data, error: perfume_error } = await createServerActionClient({ cookies })
    .from('perfume_list')
    .insert({ p_name, b_id, imgurl })
    .select();

  if (perfume_error) {
    if (perfume_error.message.includes('duplicate')) return { status: 409, message: perfume_error.message };

    console.error(perfume_error);
    throw new Error('향수 등록 실패');
  }

  const perfumeNoteList = Object.entries(selectedNoteList).flatMap(([n_type, notes]) => {
    return notes.map((note: PerfumeNote) => {
      return {
        p_id: perfume_data[0].p_id,
        n_id: note.noteId,
        n_type,
        b_id,
      };
    });
  });

  const { data: perfume_note_data, error: perfume_note_error } = await createServerActionClient({ cookies })
    .from('perfume_note_list')
    .insert(perfumeNoteList)
    .select();

  if (perfume_note_error) {
    console.error(perfume_note_error);
    throw new Error('향수 노트 정보 등록 실패');
  }

  return {
    status: 204,
    data: {
      id: perfume_data[0].p_id,
      name: perfume_data[0].p_name,
      imgUrl: perfume_data[0].imgurl,
      brandId: perfume_data[0].b_id,
      perfumeNoteData: perfume_note_data,
    },
  };
};
