import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}