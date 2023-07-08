import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from './utils/supabase/schema';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = new URL(request.url);
  const supabase = createMiddlewareClient<Database>({ req: request, res: response });

  if (url.pathname === '/api/auth') {
    const code = url.searchParams.get('code');
    if (code) {
      await supabase.auth.exchangeCodeForSession(code);
    }
  } else {
    await supabase.auth.getSession();
  }

  return response;
}
