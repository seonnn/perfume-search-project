import { Perfume } from '@/types';
import {
  BrandListResponseData,
  FilteredPerfumeListResponseData,
  NoteListResponseData,
  PerfumeListResponseData,
} from '@/types/response';
import { supabase } from '@/utils/supabase/supabase';

export const getPerfumeList = async (): Promise<Perfume[]> => {
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
      return [];
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
  } catch (error) {
    console.error(error);
    throw new Error('향수 목록 조회 실패');
  }
};

export const getFilteredPerfumeList = async (notes: number[], brands: number[]): Promise<Perfume[]> => {
  try {
    const filteredData = supabase.from('perfume_note_list').select(`
      perfume_list (
        p_id,
        p_name,
        imgurl,
        brand_list (
          b_name
        )
      )
    `);

    if (notes.length) {
      filteredData.in('n_id', notes);
    }

    if (brands.length) {
      filteredData.in('b_id', brands);
    }

    const { data } = await filteredData.returns<FilteredPerfumeListResponseData[]>();

    if (!data || !data.length) {
      return [];
    }

    const set = new Set();

    return data.reduce((acc: Perfume[], cur) => {
      const {
        p_id: id,
        p_name: name,
        imgurl: imgUrl,
        brand_list: { b_name: brand },
      } = cur.perfume_list;

      if (set.has(id)) return acc;

      set.add(id);
      return [...acc, { id, name, imgUrl, brand }];
    }, []);
  } catch (error) {
    console.error(error);
    throw new Error('향수 필터 목록 조회 실패');
  }
};

export const getNoteList = async () => {
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
      return [];
    }

    return data.map((note) => {
      const noteList = note.note_list.map((item) => {
        return { id: item.n_id, name: item.n_name };
      });

      return { fragranceId: note.f_id, noteList };
    });
  } catch (error) {
    console.error(error);
    throw new Error('노트 조회 실패');
  }
};

export const getBrandList = async () => {
  try {
    const { data } = await supabase
      .from('brand_list')
      .select(
        `
      b_id,
      b_name
    `
      )
      .returns<BrandListResponseData[]>();

    if (!data || !data.length) {
      return [];
    }

    return data.map((brand) => {
      const { b_id: id, b_name: name } = brand;
      return { id, name };
    });
  } catch (error) {
    console.error(error);
    throw new Error('브랜드 목록 조회 실패');
  }
};
