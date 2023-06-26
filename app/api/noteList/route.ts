import { NoteListResponseData } from '@/types/response';
import { getNote } from '@/utils/supabase/getNote';
import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await supabase
      .from('note_list')
      .select(
        `
      n_id,
      n_name,
      f_id
    `
      )
      .order('n_id', { ascending: true })
      .returns<NoteListResponseData[]>();

    if (!data || !data.length) {
      return NextResponse.json([]);
    }

    return NextResponse.json(
      data.map((note) => {
        return { id: note.n_id, name: note.n_name, fragranceId: note.f_id };
      })
    );
  } catch (error) {
    console.error(error);
    throw new Error('노트 조회 실패');
  }
}

export async function POST(request: Request) {
  const { n_name, f_id } = await request.json();

  const { data, error } = await supabase.from('note_list').insert({ n_name, f_id }).select();

  if (error) {
    if (error.message.includes('duplicate')) return NextResponse.json({ status: 409, message: error.message });

    throw new Error('노트 등록 실패!');
  }

  return NextResponse.json({ status: 201, data });
}

export async function PUT(request: Request) {
  const { n_id, n_name, f_id } = await request.json();

  const prevNote = await getNote(n_id);

  if (prevNote.n_name === n_name && prevNote.f_id === f_id) return NextResponse.json({ status: 409 });

  const { data, error } = await supabase.from('note_list').update({ n_name, f_id }).eq('n_id', n_id).select();

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error('노트 수정 실패!');
  }

  return NextResponse.json({ status: 204, data });
}
