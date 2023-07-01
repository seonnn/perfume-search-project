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

  if (accessToken) {
    response.cookies.set({
      name: 'access_token',
      value: accessToken,
      maxAge: 3600,
      httpOnly: true,
    });
  }

  return response;
}
