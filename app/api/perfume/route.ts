import { PerfumeNote, SelectedNoteList } from '@/types/admin';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { PerfumeListResponseData } from '@/types/response';
import { supabase } from '@/utils/supabase/supabase';

interface PerfumeRequestData {
  p_name: string;
  b_id: number;
  imgurl: string;
  selectedNoteList: SelectedNoteList;
}

export const revalidate = 0;

export async function GET() {
  try {
    const { data } = await supabase
      .from('perfume_list')
      .select(
        `
      p_id,
      p_name,
      imgurl,
      brand_list (
        b_name
      )
    `
      )
      .returns<PerfumeListResponseData[]>();

    if (!data || !data.length) {
      return NextResponse.json([]);
    }

    return NextResponse.json(
      data.map((perfume) => {
        const {
          p_id: id,
          p_name: name,
          imgurl: imgUrl,
          brand_list: { b_name: brand },
        } = perfume;

        return { id, name, imgUrl, brand };
      })
    );
  } catch (error) {
    console.error(error);
    throw new Error('향수 목록 조회 실패');
  }
}

export async function POST(request: Request) {
  const { p_name, b_id, imgurl, selectedNoteList }: PerfumeRequestData = await request.json();

  const { data: perfume_data, error: perfume_error } = await createRouteHandlerClient({ cookies })
    .from('perfume_list')
    .insert({ p_name, b_id, imgurl })
    .select();

  if (perfume_error) {
    if (perfume_error.message.includes('duplicate'))
      return NextResponse.json({ status: 409, message: perfume_error.message });

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

  const { data, error } = await createRouteHandlerClient({ cookies })
    .from('perfume_note_list')
    .insert(perfumeNoteList)
    .select();

  if (error) {
    console.error(error);
    throw new Error('향수 노트 정보 등록 실패');
  }

  return NextResponse.json({
    status: 204,
    data: {
      id: perfume_data[0].p_id,
      name: perfume_data[0].p_name,
      imgUrl: perfume_data[0].imgurl,
      brandId: perfume_data[0].b_id,
      perfumeNoteData: data,
    },
  });
}
