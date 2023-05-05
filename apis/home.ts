import { Perfume } from '@/types';
import { supabase } from '@/utils/supabase/supabase';

interface getPerfumeDataResponse {
  p_id: number;
  p_name: string;
  imgurl: string;
  brand_list: { b_name: string };
}

export const getPerfumeList = async (): Promise<Perfume[] | null> => {
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
    .returns<getPerfumeDataResponse[]>();

  if (!data) return null;

  if (error) {
    console.error(error);
    return null;
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
};
