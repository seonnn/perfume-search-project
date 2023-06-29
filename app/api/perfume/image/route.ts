import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const name = formData.get('name') as string;

  const { data, error } = await supabase.storage.from('perfume_image').upload(name, file);

  if (error) {
    const parsedError = JSON.parse(JSON.stringify(error));

    if (parsedError.statusCode === '409')
      return NextResponse.json({ status: 409, imageUrl: `/storage/v1/object/public/perfume_image/${name}` });

    throw new Error('향수 이미지 등록 실패!');
  }

  return NextResponse.json({ status: 201, imageUrl: `/storage/v1/object/public/perfume_image/${data.path}` });
}
