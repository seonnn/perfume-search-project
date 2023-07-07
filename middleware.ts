import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from './utils/supabase/schema';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const url = new URL(req.url);
  const supabase = createMiddlewareClient<Database>({ req, res });

  if (url.pathname === '/api/auth') {
    const code = url.searchParams.get('code');
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
  } else {
    await supabase.auth.getSession();
  }

  return res;
}
