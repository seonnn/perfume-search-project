import { AdminPerfumeDetailResponseData } from '@/types/response';
import { supabase } from './supabase';
import { SelectedNoteList } from '@/types/admin';

export async function getAdminPerfumeDetail(perfumeId: number) {
  const { data, error } = await supabase
    .from('perfume_list')
    .select(
      `
  p_id,
  p_name,
  imgurl,
  b_id,
  perfume_note_list (
    p_n_id,
    n_id,
    n_type
  )
`
    )
    .eq('p_id', perfumeId)
    .returns<AdminPerfumeDetailResponseData[]>();

  if (error) {
    console.error('perfume detail error', JSON.stringify(error));
    throw new Error('향수 상세 정보 조회 실패!');
  }

  const { p_id: id, p_name: name, imgurl: imgurl, b_id: brandId, perfume_note_list } = data[0];
  const perfumeNoteList = perfume_note_list.reduce(
    (acc: SelectedNoteList, cur) => {
      const { n_type, p_n_id, n_id } = cur;
      return { ...acc, [n_type]: [...acc[n_type], { perfumeNoteId: p_n_id, noteId: n_id }] };
    },
    { t: [], m: [], b: [] }
  );

  return { id, name, imgurl, brandId, perfumeNoteList };
}
