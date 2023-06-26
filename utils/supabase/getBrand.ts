import { supabase } from './supabase';

export async function getBrand(id: number) {
  const { data, error } = await supabase.from('brand_list').select().eq('b_id', id);

  if (error) {
    console.error(error);
    throw new Error('브랜드 조회 실패!');
  }

  return data[0];
}
