# 전국 인간 및 반려동물 장례 통합 정보 서비스

**Development of an Integrated Funeral Information Service for Humans and Companion Animals**

---

## 📌 프로젝트 개요

현재 한국의 장례 서비스는 가격의 투명성과 품질 보장에 한계가 있으며, 반려동물 장례 정보는 더욱 부족한 상황입니다. 본 프로젝트는 전국의 인간 및 반려동물 장례 정보를 통합하고, 후기 기반의 신뢰할 수 있는 정보를 제공하여 사용자의 합리적인 선택을 돕는 장례 통합 정보 서비스를 구축합니다.

---

## 📅 프로젝트 일정

| 주차 | 작업 내용 |
| ---- | -------- |
| 1주차 | 서비스 구조 및 요구사항 기획 |
| 2주차 | 공공 API 조사 및 데이터 수집 전략 수립 |
| 3주차 | Supabase 스키마 설계 / Next.js 초기 세팅 |
| 4~5주차 | 인간/반려동물 장례시설 데이터 연동 |
| 6~7주차 | 후기 기능 / 장례용품 비교 UI 개발 |
| 8~9주차 | 위치 기반 추천 / 마이페이지 개발 |
| 10~12주차 | UI 개선, 테스트, 발표자료 준비 및 배포 |

---

## ⚙️ 주요 기술 스택

### 프론트엔드

- **Next.js**: React 기반 SSR/SSG 프레임워크
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크

### 백엔드

- **Supabase**: PostgreSQL 기반의 오픈소스 BaaS

### 기타

- **Figma**: UI 설계 및 프로토타이핑
- **VSCode**: 개발 환경

---

## 🔗 활용 공공 데이터

### ⛪ 인간 장례

- [보건복지부_전국 장례식장 현황](https://www.data.go.kr/data/15122367/openapi.do)
- [보건복지부_전국 화장시설 현황](https://www.data.go.kr/data/15122369/openapi.do)

### 🐶 반려동물 장례

- [농림축산식품부_반려동물 장묘업 현황](https://www.data.go.kr/data/15073587/fileData.do)
- [전국 동물 장묘업체 정보](https://www.data.go.kr/data/15045054/fileData.do)

### 💰 장례비/용품

- [부산시설공단_장례비 산출 정보 API](https://www.data.go.kr/data/15028052/openapi.do)

---

## 🌟 핵심 기능

- **위치 기반 추천**: 가까운 장례식장, 화장장, 동물 장묘업체를 지도 기반으로 추천
- **후기 기능**: 이용 후기 및 별점 등록 및 조회 기능
- **장례용품 비교**: 장례용품 구성 및 가격 정보, 후기 기반 전국 평균가 비교
- **반려동물 전용 메뉴**: 동물 장묘업체 전용 후기 및 정보 제공
- **마이페이지**: 나의 후기, 즐겨찾기, 방문 기록 열람 가능

---

## ✅ 기대 효과

- 후기 기반 정보 제공으로 장례비용 불투명성 해소
- 반려동물 장례 포함, 포용적 장례 서비스 제공
- 공공 데이터 + 후기 + 위치 추천 결합 → 실용성 극대화
- 사용자 중심의 신뢰 가능한 장례 정보 플랫폼

---

## 🛠️ 실행 방법

```bash
git clone https://github.com/your-username/funeral-information-service.git
cd funeral-information-service
npm install
npm run dev
