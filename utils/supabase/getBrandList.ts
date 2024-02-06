import { BrandListResponseData } from '@/types/response';
import { supabase } from './supabase';

export async function getBrandList() {
  const { data, error } = await supabase
    .from('brand_list')
    .select(
      `
      b_id,
      b_name
    `
    )
    .returns<BrandListResponseData[]>();

  if (error) {
    console.error(error);
    throw new Error('브랜드 목록 조회 실패');
  }

  if (!data || !data.length) {
    return [];
  }

  return data.map((brand) => {
    const { b_id: id, b_name: name } = brand;
    return { id, name };
  });
}
