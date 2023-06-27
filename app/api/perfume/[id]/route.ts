import { supabase } from '@/utils/supabase/supabase';
import { AdminPerfumeDetailResponseData } from '@/types/response';
import { NextResponse } from 'next/server';
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

  return NextResponse.json({ status: 200, id, name, imgurl, brandId, perfume_note_list });
}
