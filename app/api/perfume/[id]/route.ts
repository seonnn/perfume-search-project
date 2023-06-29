import { supabase } from '@/utils/supabase/supabase';
import { AdminPerfumeDetailResponseData } from '@/types/response';
import { NextResponse } from 'next/server';
import { PerfumeNote, SelectedNoteList } from '@/types/admin';
import { getAdminPerfumeDetail } from '@/utils/supabase/getAdminPerfumeDetail';

export async function GET(request: Request, { params }: { params: { id: string } }) {
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
    .eq('p_id', +params.id)
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

  return NextResponse.json({ status: 200, id, name, imgurl, brandId, perfumeNoteList });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { p_id, p_name, b_id, imgurl, selectedNoteList, notesToDelete } = await request.json();

  const prevPerfume = await getAdminPerfumeDetail(+params.id);

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
    return NextResponse.json({ status: 409 });

  let perfume_data = undefined;
  if (prevPerfume.name !== p_name || prevPerfume.brandId !== b_id || prevPerfume.imgurl !== imgurl) {
    const { data, error } = await supabase
      .from('perfume_list')
      .update({ p_name, b_id, imgurl })
      .eq('p_id', +params.id)
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

  const { error: note_delete_error } = await supabase
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

  const { data, error } = await supabase.from('perfume_note_list').insert(perfumeNoteList).select();

  if (error) {
    console.error(error);
    throw new Error('향수 데이터 수정 실패');
  }

  return NextResponse.json(
    perfume_data
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
        }
  );
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ status: 204 });
}
