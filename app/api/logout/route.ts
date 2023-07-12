import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function POST() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error('로그아웃 실패');
  }

  const response = NextResponse.json({ status: 204 });

  response.cookies.delete(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(8).split('.')[0]}-auth-token`);

  return response;
}
