import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const apiKey = process.env.PUBLIC_DATA_API_KEY;
  const { searchParams } = new URL(req.url);
  const pageNo = searchParams.get('pageNo') || '1';
  const numOfRows = searchParams.get('numOfRows') || '10';
  const ctpv = searchParams.get('ctpv') || '서울특별시';

  const url = `https://apis.data.go.kr/1352000/ODMS_DATA_04_1/callData04_1Api?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&apiType=JSON&ctpv=${encodeURIComponent(ctpv)}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    return NextResponse.json(json);
  } catch (error) {
    console.error('❌ API 호출 실패:', error);
    return NextResponse.json({ error: '공공데이터 호출 실패' }, { status: 500 });
  }
}
