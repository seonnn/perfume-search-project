import { BrandListResponseData } from '@/types/response';
import { getBrand } from '@/utils/supabase/getBrand';
import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

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

export async function POST(request: Request) {
  const { b_name } = await request.json();

  const { data, error } = await createRouteHandlerClient({ cookies }).from('brand_list').insert({ b_name }).select();

  if (error) {
    if (error.message.includes('duplicate')) return NextResponse.json({ status: 409, message: error.message });

    throw new Error('브랜드 등록 실패!');
  }

  return NextResponse.json({ status: 201, data });
}

export async function PUT(request: Request) {
  const { b_id, b_name } = await request.json();

  const prevBrand = await getBrand(b_id);

  if (prevBrand.b_name === b_name) return NextResponse.json({ status: 409 });

  const { data, error } = await createRouteHandlerClient({ cookies })
    .from('brand_list')
    .update({ b_name })
    .eq('b_id', b_id)
    .select();

  if (error) {
    console.error(JSON.stringify(error));

    throw new Error('브랜드 수정 실패!');
  }

  return NextResponse.json({ status: 201, data });
}

export async function DELETE(request: Request) {
  const { b_id } = await request.json();

  const { error } = await createRouteHandlerClient({ cookies }).from('brand_list').delete().eq('b_id', b_id);

  if (error) {
    console.error(error);
    throw new Error('브랜드 삭제 실패!');
  }

  return NextResponse.json({ status: 204 });
}
