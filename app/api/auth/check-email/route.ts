// /app/api/auth/check-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (data) {
    return NextResponse.json({ error: '이미 존재하는 이메일입니다.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
