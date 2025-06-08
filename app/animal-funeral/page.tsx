'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';

interface AnimalFuneralItem {
  지역: string;
  "동물장묘업(업체 수)": number;
  백분율: string;
  "장례시설만 운영": number;
  "장례_화장시설 운영": number;
  "장례_화장_납골시설 운영": number;
  "장례_화장_건조_납골시설 운영": number;
  기타: number;
  "종사자수(명)": number;
}


export default function AnimalFuneralPage() {
  const [data, setData] = useState<AnimalFuneralItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const rowsPerPage = 5;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/animal-funeral?page=${page}&perPage=${rowsPerPage}`);
      const json = await res.json();
      console.log(json);
      
      setData(json.data || []);
      setTotalCount(json.totalCount || 0);
    } catch (err) {
      console.error('❌ API 호출 오류:', err);
      setData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    fetchData(page);
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
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">전국 동물 장묘업 현황 총 {totalCount}</h1>

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
                      <p><strong>지역:</strong> {item["지역"]}</p>
                      <p><strong>해당 지역 동물장묘업 총 업체 수:</strong> {item["동물장묘업(업체 수)"]}</p>
                      {/* <p><strong>백분율:</strong> {item["백분율"]}</p> */}
                      <p><strong>장례시설만 운영:</strong> {item["장례시설만 운영"]}</p>
                      <p><strong>장례+화장시설 운영:</strong> {item["장례_화장시설 운영"]}</p>
                      <p><strong>장례+화장+납골시설 운영:</strong> {item["장례_화장_납골시설 운영"]}</p>
                      <p><strong>장례+화장+건조+납골시설 운영:</strong> {item["장례_화장_건조_납골시설 운영"]}</p>
                      <p><strong>기타:</strong> {item["기타"]}</p>
                      <p><strong>종사자 수:</strong> {item["종사자수(명)"]}</p>
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
