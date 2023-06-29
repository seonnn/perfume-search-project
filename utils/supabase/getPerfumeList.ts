import { PerfumeListResponseData } from '@/types/response';
import { supabase } from './supabase';

export async function getPerfumeList() {
  const { data, error } = await supabase
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

  if (error) {
    console.error(error);
    throw new Error('향수 목록 조회 실패');
  }

  return data.map((perfume) => {
    const {
      p_id: id,
      p_name: name,
      imgurl: imgUrl,
      brand_list: { b_name: brand },
    } = perfume;

    return { id, name, imgUrl, brand };
  });
}
