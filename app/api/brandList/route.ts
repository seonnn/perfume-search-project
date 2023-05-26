import { BrandListResponseData } from '@/types/response';
import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET() {
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
      return NextResponse.json([]);
    }

    return NextResponse.json(
      data.map((brand) => {
        const { b_id: id, b_name: name } = brand;
        return { id, name };
      })
    );
  } catch (error) {
    console.error(error);
    throw new Error('브랜드 목록 조회 실패');
  }
}
