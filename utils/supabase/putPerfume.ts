'use server';
import { PerfumeNote } from '@/types/admin';
import { getAdminPerfumeDetail } from './getAdminPerfumeDetail';
import { PostPerfumeRequestData } from './postPerfume';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export interface PutPerfumeRequestData extends PostPerfumeRequestData {
  p_id: number;
  notesToDelete: number[];
}

export const putPerfume = async (requestData: PutPerfumeRequestData) => {
  const { p_id, p_name, b_id, imgurl, selectedNoteList, notesToDelete } = requestData;
  const prevPerfume = await getAdminPerfumeDetail(p_id);

  const isNoteListDuplicated = (prevList: PerfumeNote[], newList: PerfumeNote[]) => {
    const prevNoteIds = prevList
      .map((note) => note.noteId)
      .sort((a, b) => a - b)
      .join('');
    const newNoteIds = newList
      .map((note) => note.noteId)
      .sort((a, b) => a - b)
      .join('');

    return prevNoteIds === newNoteIds;
  };

  if (
    prevPerfume.name === p_name &&
    prevPerfume.brandId === b_id &&
    prevPerfume.imgurl === imgurl &&
    isNoteListDuplicated(prevPerfume.perfumeNoteList['t'], selectedNoteList['t']) &&
    isNoteListDuplicated(prevPerfume.perfumeNoteList['m'], selectedNoteList['m']) &&
    isNoteListDuplicated(prevPerfume.perfumeNoteList['b'], selectedNoteList['b'])
  )
    return { status: 409 };

  let perfume_data = undefined;
  if (prevPerfume.name !== p_name || prevPerfume.brandId !== b_id || prevPerfume.imgurl !== imgurl) {
    const { data, error } = await createServerActionClient({ cookies })
      .from('perfume_list')
      .update({ p_name, b_id, imgurl })
      .eq('p_id', p_id)
      .select();

    if (error) {
      console.error(error);
      throw new Error('향수 데이터 수정 실패');
    }

    perfume_data = data;
  }

  const perfumeNoteToDelete = [...selectedNoteList['t'], ...selectedNoteList['m'], ...selectedNoteList['b']]
    .filter((note) => note.perfumeNoteId)
    .map((note) => note.perfumeNoteId);

  const { error: note_delete_error } = await createServerActionClient({ cookies })
    .from('perfume_note_list')
    .delete()
    .in('p_n_id', [...notesToDelete, ...perfumeNoteToDelete]);

  if (note_delete_error) {
    console.error(note_delete_error);
    throw new Error('향수 데이터 수정 실패');
  }

  const perfumeNoteList = Object.entries<PerfumeNote[]>(selectedNoteList).flatMap(([n_type, notes]) => {
    return notes.map((note: PerfumeNote) => {
      return {
        p_id,
        n_id: note.noteId,
        n_type,
        b_id,
      };
    });
  });

  const { data, error } = await createServerActionClient({ cookies })
    .from('perfume_note_list')
    .insert(perfumeNoteList)
    .select();

  if (error) {
    console.error(error);
    throw new Error('향수 데이터 수정 실패');
  }

  revalidatePath(`/perfume/${p_id}`);

  return perfume_data
    ? {
        status: 204,
        data: {
          id: perfume_data[0].p_id,
          name: perfume_data[0].p_name,
          imgUrl: perfume_data[0].imgurl,
          brandId: perfume_data[0].b_id,
          perfumeNoteData: data,
        },
      }
    : {
        status: 204,
        data: {
          id: p_id,
          name: p_name,
          imgUrl: imgurl,
          brandId: b_id,
          perfumeNoteData: data,
        },
      };
};
