'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';

type CremationItem = {
  ctpv: string;                // 시도
  sigungu: string;            // 시군구
  fcltNm: string;             // 시설명
  addr: string;               // 주소
  telno: string;              // 전화번호
  fxno: string;               // 팩스번호
  homepageUrl: string;        // 홈페이지
  tpkct: string;              // 안치가능구수
  gubun: string;              // 구분 (공설/사설)
  brzCnt: string;             // 빈소 수
  diningFclt: string;         // 식당
  store: string;              // 매점
  pklt: string;               // 주차장
  bereavedWaitRm: string;     // 유족대기실
  sdblsPfFclt: string;        // 장애인 편의시설
};


// ✅ 한국 시/도 목록
const regions = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원특별자치도',
  '충청북도',
  '충청남도',
  '전북특별자치도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도'
];

export default function CremationPage() {
  const [data, setData] = useState<CremationItem[]>([]);
  const [ctpv, setCtpv] = useState('서울특별시');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 10;

  const fetchData = async (page: number, region: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cremation?pageNo=${page}&numOfRows=${rowsPerPage}&ctpv=${encodeURIComponent(region)}`
      );
      const json = await res.json();
      const rawItems = json?.items;
      const total = parseInt(json?.totalCount ?? '0', 10);
      const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
      setData(items);
      setTotalCount(total);
    } catch {
      setData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1, '서울특별시');
    setSubmitted(true); // ✅ 초기 렌더링에서도 submitted true 처리
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setCurrentPage(1);
    fetchData(1, ctpv);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    fetchData(page, ctpv);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(totalCount / rowsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageClick(i + 1)}
            className={`px-3 py-1 rounded border ${
              i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">전국 화장시설 현황 검색</h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <select
            value={ctpv}
            onChange={(e) => setCtpv(e.target.value)}
            className="border px-3 py-2 flex-1 rounded light:bg-white dark:text-white dark:bg-black"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            검색
          </button>
        </form>

        {!loading && (
          <h1 className="text-2xl font-bold mb-4">{ctpv} 총 화장시설 {totalCount}곳</h1>
        )}

        {loading && <p>🔄 로딩 중입니다...</p>}

        {!loading && (
          <>
            {data.length === 0 ? (
              <p className="text-gray-500">🔍 검색 결과가 없습니다.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {data.map((item, idx) => (
                    <li key={idx} className="border rounded p-4 shadow">
                      <p><strong>시설명:</strong> {item.fcltNm}</p>
                      <p><strong>시도:</strong> {item.ctpv}</p>
                      <p><strong>시군구:</strong> {item.sigungu}</p>
                      <p><strong>주소:</strong> {item.addr}</p>
                      <p><strong>전화번호:</strong> {item.telno}</p>
                      {/* <p><strong>운영형태:</strong> {item.operType}</p> */}
                      <p><strong>구분:</strong> {item.gubun}</p>
                      <p><strong>안치가능구수:</strong> {item.tpkct}</p>
                      <p><strong>식당:</strong> {item.diningFclt}</p>
                      <p><strong>매점:</strong> {item.store}</p>
                      <p><strong>유족대기실:</strong> {item.bereavedWaitRm}</p>
                      <p><strong>주차장:</strong> {item.pklt}</p>
                      <p><strong>장애인 편의시설:</strong> {item.sdblsPfFclt}</p>
                      {item.homepageUrl && (
                        <p>
                          <strong>홈페이지:</strong>{' '}
                          <a
                            href={item.homepageUrl.startsWith('http') ? item.homepageUrl : `http://${item.homepageUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {item.homepageUrl}
                          </a>
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                {renderPagination()}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
