import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '10';

  const serviceKey = '3YyAb4cwozeqMSeNWy8EjnEApQlYIaC2LL2+kgbL75wzpSwgolyy0phQx6tK3xEfRRG7t8FHqTeSkkUBRBkuiw==';
  const encodedKey = encodeURIComponent(serviceKey); // ✅ 인코딩 필수

  const url = `https://api.odcloud.kr/api/15073587/v1/uddi:de52538c-ffb0-4431-a9af-a2d120e479da?page=${page}&perPage=${perPage}&returnType=JSON&serviceKey=${encodedKey}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ 응답 오류:', res.status, errorText);
      return NextResponse.json({ error: 'ODCLOUD 응답 오류', detail: errorText }, { status: res.status });
    }

    const json = await res.json();
    return NextResponse.json({
      data: json.data || [],
      totalCount: json.totalCount || 0,
    });
  } catch (err) {
    console.error('🔥 API 호출 실패:', err);
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 });
  }
}
