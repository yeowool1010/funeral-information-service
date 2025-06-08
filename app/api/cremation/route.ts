import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const serviceKey = process.env.PUBLIC_DATA_API_KEY;
  const { searchParams } = new URL(req.url);
  const pageNo = searchParams.get('pageNo') || '1';
  const numOfRows = searchParams.get('numOfRows') || '10';
  const ctpv = searchParams.get('ctpv') || '서울특별시';

  const url = `https://apis.data.go.kr/1352000/ODMS_DATA_05_1/callData05_1Api?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&apiType=JSON&ctpv=${encodeURIComponent(ctpv)}`;

  try {
    const res = await fetch(url);
    const text = await res.text();

    try {
      const json = JSON.parse(text);
      
      return NextResponse.json({
        items: json?.items || [],
        totalCount: json?.totalCount || 0,
      });
    } catch (err) {
      console.error('⚠️ JSON 파싱 실패. 응답은 XML일 가능성 있음.');
      return NextResponse.json({ error: 'API 응답이 JSON이 아님', raw: text }, { status: 500 });
    }
  } catch (err) {
    console.error('🔥 API 호출 실패:', err);
    return NextResponse.json({ error: 'API 호출 실패' }, { status: 500 });
  }
}
