import { PerfumeDetailResponseData } from '@/types/response';
import { supabase } from './supabase';
import { PerfumeNoteList } from '@/types';

export async function getPerfumeDetail(id: string) {
  const { data, error } = await supabase
    .from('perfume_list')
    .select(
      `
      p_id,
      p_name,
      imgurl,
      brand_list (
        b_id,
        b_name
      ),
      perfume_note_list (
        n_id,
        n_type,
        note_list (
          n_id,
          n_name
        )
      )
    `
    )
    .eq('p_id', id)
    .returns<PerfumeDetailResponseData[]>();

  if (error) {
    console.error(JSON.stringify(error));
    throw new Error('향수 상세 정보 조회 실패');
  }

  const {
    p_name: name,
    imgurl: imgUrl,
    brand_list: { b_name: brandName, b_id: brandId },
    perfume_note_list,
  } = data[0];

  const perfumeNoteList: PerfumeNoteList = {
    topNote: [],
    middleNote: [],
    baseNote: [],
  };

  perfume_note_list.forEach((note) => {
    switch (note.n_type) {
      case 't':
        perfumeNoteList.topNote.push({ id: note.n_id, name: note.note_list.n_name });
        break;
      case 'm':
        perfumeNoteList.middleNote.push({ id: note.n_id, name: note.note_list.n_name });
        break;
      case 'b':
        perfumeNoteList.baseNote.push({ id: note.n_id, name: note.note_list.n_name });
        break;
      default:
        break;
    }
  });

  return { name, imgUrl, brandName, brandId, perfumeNoteList };
}
