import { Fragrance, Note } from '@/types';

export const fragranceList: Fragrance[] = [
  { f_id: 1, f_name: 'Citrus' },
  { f_id: 2, f_name: 'Fruits' },
  { f_id: 3, f_name: 'Flowers' },
  { f_id: 4, f_name: 'Green, Herbs' },
  { f_id: 5, f_name: 'Spices' },
  { f_id: 6, f_name: 'Sweet, Gourmand' },
  { f_id: 7, f_name: 'Wood' },
  { f_id: 8, f_name: 'Musk, Amber, Animalic' },
  { f_id: 9, f_name: 'etc' },
];

export const noteList: Note[] = [
  {
    n_id: 1,
    n_name: '베르가못',
    f_id: 1,
  },
  {
    n_id: 2,
    n_name: '비터오렌지',
    f_id: 1,
  },
  {
    n_id: 3,
    n_name: '블러드오렌지',
    f_id: 1,
  },
  {
    n_id: 4,
    n_name: '시트러스',
    f_id: 1,
  },
  {
    n_id: 5,
    n_name: '베버나',
    f_id: 1,
  },
  {
    n_id: 6,
    n_name: '감',
    f_id: 2,
  },
  {
    n_id: 7,
    n_name: '배',
    f_id: 2,
  },
  {
    n_id: 8,
    n_name: '블랙베리',
    f_id: 2,
  },
  {
    n_id: 9,
    n_name: '블랙커런트',
    f_id: 2,
  },
  {
    n_id: 10,
    n_name: '프리지아',
    f_id: 3,
  },
  {
    n_id: 11,
    n_name: '블루벨',
    f_id: 3,
  },
  {
    n_id: 12,
    n_name: '양귀비꽃',
    f_id: 3,
  },
  {
    n_id: 13,
    n_name: '오렌지 플라워',
    f_id: 3,
  },
  {
    n_id: 14,
    n_name: '세이지',
    f_id: 4,
  },
  {
    n_id: 15,
    n_name: '보리',
    f_id: 4,
  },
  {
    n_id: 16,
    n_name: '푸제르',
    f_id: 4,
  },
  {
    n_id: 17,
    n_name: '월계수 잎',
    f_id: 5,
  },
  {
    n_id: 18,
    n_name: '초콜릿 퍼지',
    f_id: 6,
  },
  {
    n_id: 19,
    n_name: '파출리',
    f_id: 7,
  },
  {
    n_id: 20,
    n_name: '시더우드',
    f_id: 7,
  },
  {
    n_id: 21,
    n_name: '암브레트 씨',
    f_id: 8,
  },
  {
    n_id: 22,
    n_name: '화이트 머스크',
    f_id: 8,
  },
  {
    n_id: 23,
    n_name: '씨 쏠트',
    f_id: 9,
  },
  {
    n_id: 24,
    n_name: '마린',
    f_id: 9,
  },
  {
    n_id: 25,
    n_name: '머스크',
    f_id: 8,
  },
];

export const perfumeList = [
  {
    id: 0,
    b_id: 1,
    name: '잉글리쉬 페어 앤 프리지아 코롱',
    topNote: [7],
    middleNote: [10],
    baseNote: [19],
    imgUrl: '/perfumeImg/조말론_잉글리쉬페어앤프리지아.png',
  },
  {
    id: 1,
    b_id: 1,
    name: '우드 세이지 앤 씨 솔트 코롱',
    topNote: [21],
    middleNote: [23],
    baseNote: [14],
    imgUrl: '/perfumeImg/조말론_우드세이지앤시솔트.png',
  },
  {
    id: 2,
    b_id: 1,
    name: '블랙베리 앤 베이 코롱',
    topNote: [8],
    middleNote: [17],
    baseNote: [20],
    imgUrl: '/perfumeImg/조말론_블랙베리앤베이.png',
  },
  {
    id: 3,
    b_id: 1,
    name: '와일드 블루벨 코롱',
    topNote: [11],
    middleNote: [6],
    baseNote: [22],
    imgUrl: '/perfumeImg/조말론_와일드블루벨.png',
  },
  {
    id: 4,
    b_id: 1,
    name: '포피 앤 바알리 코롱',
    topNote: [9],
    middleNote: [12],
    baseNote: [15],
    imgUrl: '/perfumeImg/조말론_포피앤바알리.png',
  },
  {
    id: 20,
    b_id: 2,
    name: '클래식 웜 코튼 EDP',
    topNote: [4, 5],
    middleNote: [13, 24],
    baseNote: [16, 25],
    imgUrl: '/perfumeImg/클린_웜코튼.png',
  },
];

export const brandList = [
  { b_name: '조말론', b_id: 1 },
  { b_name: '클린', b_id: 2 },
];
