'use server';
import { SelectedNoteList } from '@/types/admin';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export interface DeletePerfumeRequestData {
  p_id: number;
  selectedNoteList: SelectedNoteList;
  imageUrl: string;
}

export const deletePerfume = async (requestData: DeletePerfumeRequestData) => {
  const { p_id, selectedNoteList, imageUrl } = requestData;

  const perfumeNoteToDelete = [...selectedNoteList['t'], ...selectedNoteList['m'], ...selectedNoteList['b']]
    .filter((note) => note.perfumeNoteId)
    .map((note) => note.perfumeNoteId);

  const { error: note_delete_error } = await createServerActionClient({ cookies })
    .from('perfume_note_list')
    .delete()
    .in('p_n_id', [perfumeNoteToDelete]);

  if (note_delete_error) {
    console.error(note_delete_error);
    throw new Error('향수 데이터 삭제 실패');
  }

  const { error } = await createServerActionClient({ cookies }).from('perfume_list').delete().eq('p_id', p_id);
  const { data, error: image_delete_error } = await createServerActionClient({ cookies })
    .storage.from('perfume_image')
    .remove([imageUrl]);

  if (error || image_delete_error) {
    console.error(error, image_delete_error);
    throw new Error('향수 데이터 삭제 실패');
  }

  revalidatePath(`/`);
  revalidatePath(`/perfume/${p_id.toString()}`);

  return { status: 204 };
};
