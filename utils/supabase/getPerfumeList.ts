import { FilteredPerfumeListResponseData, PerfumeListResponseData } from '@/types/response';
import { supabase } from './supabase';
import { Perfume } from '@/types';

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

export async function getFilteredPerfumeList(notes: string, brands: string, keyword?: string) {
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

  if (notes?.length) {
    filteredData.in('n_id', notes.split('|'));
  }

  if (brands?.length) {
    filteredData.in('b_id', brands.split('|'));
  }

  const { data, error } = await filteredData.returns<FilteredPerfumeListResponseData[]>();

  if (error) {
    console.error(error);
    throw new Error('향수 필터 목록 조회 실패');
  }

  if (!data || !data.length) {
    return [];
  }

  const deduplicatedData = data.reduce<Record<string, Perfume>>((acc, cur) => {
    if (acc[cur.perfume_list.p_id]) return acc;

    const {
      p_id: id,
      p_name: name,
      imgurl: imgUrl,
      brand_list: { b_name: brand },
    } = cur.perfume_list;

    acc[id] = { id, name, imgUrl, brand };
    return acc;
  }, {});

  return Object.values(deduplicatedData);
}

export async function getFilterAndSearchPerfumeList(keyword: string, notes: string, brands: string) {
  let start = new Date();
  let perfumeList = notes || brands ? await getFilteredPerfumeList(notes || '', brands || '') : await getPerfumeList();

  if (keyword?.replaceAll(' ', '').length) {
    perfumeList = perfumeList.filter((perfume) =>
      perfume.name.replaceAll(' ', '').includes(keyword.replaceAll(' ', ''))
    );
  }
  let end = new Date();
  console.log('데이터 처리 시간!!!', end.getTime() - start.getTime());

  return perfumeList;
}

// export const getFilterAndSearchPerfumeList = async (keyword: string, notes: string, brands: string) => {
//   const { data, error } = await supabase.rpc('fn_filter_search_perfume', {
//     notes,
//     brands,
//     keyword: keyword.replaceAll(' ', ''),
//   });

//   if (error) {
//     console.error(error);
//     throw new Error('향수 검색 & 필터 실패');
//   }

//   return data.map((perfume) => {
//     const { p_id: id, p_name: name, imgurl: imgUrl, b_name: brand } = perfume;
//     return { id, name, imgUrl, brand };
//   });
// };
