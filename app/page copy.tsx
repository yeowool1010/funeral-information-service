import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex bg-[#F9FAFB] font-sans text-[#333]">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-md p-6 flex flex-col gap-4 text-sm">
        <h2 className="text-md font-bold mb-2">마이페이지</h2>
        <nav className="flex flex-col gap-3">
          <span className="text-orange-500 border-l-2 border-orange-400 pl-2 font-semibold">장례식장 검색</span>
          <span className="pl-2">내 정보</span>
          <span className="pl-2">테마</span>
          <span className="pl-2">나의 활동</span>
          <span className="pl-2">고객 센터</span>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Top Logo */}
        <h1 className="text-center text-3xl text-orange-500 font-semibold mb-10">장례식장 조회</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="장례식장 이름 또는 지역으로 검색"
            className="w-full max-w-xl px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600">
            검색
          </button>
        </div>

        {/* Search Results */}
        <div className="bg-white shadow-md rounded p-6">
          <div className="grid grid-cols-[1fr_120px_100px] gap-4 font-semibold text-sm text-gray-600 border-b pb-3 mb-4">
            <div>장례식장</div>
            <div>주소</div>
            <div>가격</div>
          </div>

          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_120px_100px] items-center gap-4 py-4 border-b text-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={`/funeral-${index + 1}.jpg`}
                  alt={`장례식장 ${index + 1}`}
                  width={100}
                  height={60}
                  className="rounded shadow"
                />
                <span className="font-medium">
                  {["서울중앙장례식장", "부산한빛장례식장", "대구은혜장례식장"][index]}
                </span>
              </div>
              <span className="text-gray-600 text-sm">
                {["서울 강남구", "부산 해운대구", "대구 수성구"][index]}
              </span>
              <span className="text-gray-700 font-semibold">₩1,300,000</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
          <nav className="inline-flex space-x-1 text-sm">
            <button className="px-3 py-1 border rounded-l bg-white hover:bg-gray-100">«</button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`px-3 py-1 border ${
                  page === 1 ? "bg-orange-500 text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 border rounded-r bg-white hover:bg-gray-100">»</button>
          </nav>
        </div>
      </main>
    </div>
  );
}
