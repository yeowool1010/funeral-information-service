'use client';

import { useEffect, useState } from 'react';
import Header from '@/app/components/Header';

type FuneralItem = {
  sigungu: string;
  fxno: string;
  store: string;
  bereavedWaitRm: string;
  operType: string;
  diningFclt: string;
  telno: string;
  gubun: string;
  fcltNm: string;
  homepageUrl: string;
  tpkct: string;
  pklt: string;
  ctpv: string;
  addr: string;
  ehrCnt: string;
  mtaCnt: string;
  sdblsPfFclt: string;
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

export default function MePage() {


  return (
    <div className="">
    <Header />
    <p>마이페이지</p>
    </div>
  );
}
