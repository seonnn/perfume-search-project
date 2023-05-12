import { PerfumeNoteList } from '@/types';
import { PerfumeDetailResponseData, PerfumeListResponseData } from '@/types/response';
import { supabase } from '@/utils/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  try {
    const { id } = params;
    const { data } = await supabase
      .from('perfume_list')
      .select(
        `
      p_id,
      p_name,
      imgurl,
      brand_list (
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

    if (!data || !data.length) throw new Error('향수 상세 정보 없음');

    const {
      p_name: name,
      imgurl: imgUrl,
      brand_list: { b_name: brandName },
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

    return NextResponse.json({ name, imgUrl, brandName, perfumeNoteList });
  } catch (error) {
    console.error(error);
    throw new Error('향수 상세 정보 조회 실패');
  }
}
