import { supabase } from '@/utils/supabase/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    throw new Error('회원 가입 실패');
  }

  return NextResponse.json({ status: 201, data });
}
