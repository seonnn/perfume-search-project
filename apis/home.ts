import { Perfume } from '@/types';
import { supabase } from '@/utils/supabase/supabase';

export const getPerfumeList = async (): Promise<Perfume[] | null> => {
  const { data, error } = await supabase.from('perfume_list').select(
    `
      p_id,
      p_name,
      imgurl,
      brand_list (
        b_name
      )
    `
  );

  if (!data) return null;

  if (error) {
    console.error(error);
    return null;
  }

  return data.map((perfume) => {
    const { p_id: id, p_name: name, imgurl: imgUrl } = perfume;
    const brand = perfume.brand_list
      ? Array.isArray(perfume.brand_list)
        ? perfume.brand_list[0].b_name
        : perfume.brand_list.b_name
      : '브랜드 미등록';

    return { id, name, imgUrl, brand };
  });
};
