import { NoteListResponseData } from '@/types/response';
import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
  try {
    const { data } = await supabase
      .from('fragrance_list')
      .select(
        `
      f_id,
      note_list (
        n_id,
        n_name
      )
    `
      )
      .returns<NoteListResponseData[]>();

    if (!data || !data.length) {
      return NextResponse.json([]);
    }

    return NextResponse.json(
      data.map((note) => {
        const noteList = note.note_list.map((item) => {
          return { id: item.n_id, name: item.n_name };
        });

        return { fragranceId: note.f_id, noteList };
      })
    );
  } catch (error) {
    console.error(error);
    throw new Error('노트 조회 실패');
  }
}
