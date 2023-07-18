import { supabase } from '@/utils/supabase/supabase';
import { AuthError } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

interface CustomAuthError extends AuthError {
  msg: string;
}

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    if (error.message.includes('already registered')) return NextResponse.json({ status: 409, message: error.message });

    console.error(JSON.parse(JSON.stringify(error)));
    throw new Error('회원가입 실패!');
  }

  return NextResponse.json({ status: 201, data });
}
