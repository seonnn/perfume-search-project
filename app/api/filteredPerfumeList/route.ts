import { Perfume } from '@/types';
import { FilteredPerfumeListResponseData } from '@/types/response';
import { supabase } from '@/utils/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
// export const cache = 'no-store';
// export const revalidate = 1;

export async function GET(request: NextRequest) {
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
    const { searchParams } = new URL(request.url || '');
    const notes = searchParams.get('notes');
    const brands = searchParams.get('brands');

    if (notes?.length) {
      filteredData.in('n_id', notes.split(','));
    }

    if (brands?.length) {
      filteredData.in('b_id', brands.split(','));
    }

    const { data } = await filteredData.returns<FilteredPerfumeListResponseData[]>();

    if (!data || !data.length) {
      return NextResponse.json([]);
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

    return NextResponse.json(Object.values(deduplicatedData));
  } catch (error) {
    console.error(error);
    throw new Error('향수 필터 목록 조회 실패');
  }
}
