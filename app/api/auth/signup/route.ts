// import { NextRequest, NextResponse } from 'next/server';
// import { supabase } from '@/app/lib/supabase';

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();
//   const { data, error } = await supabase.auth.signUp({ email, password });

//   if (error) return NextResponse.json({ error: error.message }, { status: 400 });
//   return NextResponse.json({ data });
// }

// /app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // 회원가입 성공 시 users 테이블에 이메일 저장
  await supabase.from('users').insert({ email });

  return NextResponse.json({ data });
}
