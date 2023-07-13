import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error('로그인 실패');
  }

  const response = NextResponse.json({ status: 201, data: data.session?.user });
  const accessToken = data.session?.access_token;
  const refreshToken = data.session?.refresh_token;

  if (accessToken && refreshToken) {
    response.cookies.set({
      name: `sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(8).split('.')[0]}-auth-token`,
      value: JSON.stringify([accessToken, refreshToken, null, null, null]),
      maxAge: 3600,
    });
  }

  return response;
}
