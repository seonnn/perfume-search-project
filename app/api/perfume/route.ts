import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const filename = JSON.parse(formData.get('imagename') as string);

    const { data, error } = await supabase.storage.from('perfume_image').upload(filename.imagename, file);
    if (error) {
      console.error('error:' + JSON.stringify(error));
      return NextResponse.json({ status: 500, error: error });
    }

    const imageUrl = data.path;
    console.log('imageUrl:', imageUrl);

    return NextResponse.json({ status: 201, res: file });
  } catch (error) {
    console.error('post catch error:' + error);
    throw new Error('향수 등록 실패');
  }
}
