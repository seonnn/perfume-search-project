interface NoteList {
  [key: string]: string[];
}

export const noteList: NoteList = {
  Citrus: ['베르가못', '비터오렌지', '블러드오렌지', '시트러스', '베버나'].sort((a, b) => a.localeCompare(b, 'ko-kr')),
  Fruits: ['감', '배', '블랙베리', '블랙커런트'].sort((a, b) => a.localeCompare(b)),
  Flowers: ['프리지아', '블루벨', '양귀비꽃', '오렌지 플라워'].sort((a, b) => a.localeCompare(b)),
  ['Green, Herbs']: ['세이지', '보리', '푸제르'].sort((a, b) => a.localeCompare(b)),
  Spices: ['월계수 잎'].sort((a, b) => a.localeCompare(b)),
  ['Sweet, Gourmand']: ['초콜릿 퍼지'].sort((a, b) => a.localeCompare(b)),
  Wood: ['파출리', '시더우드'].sort((a, b) => a.localeCompare(b)),
  ['Musk, Amber, Animalic']: ['암브레트 씨', '화이트 머스크'].sort((a, b) => a.localeCompare(b)),
  etc: ['씨 쏠트', '마린'].sort((a, b) => a.localeCompare(b)),
};

export const perfumeList = [
  {
    id: 0,
    brand: '조말론',
    name: '잉글리쉬 페어 앤 프리지아 코롱',
    topNote: ['배'],
    heartNote: ['프리지아'],
    baseNote: ['파출리'],
    imgUrl: '/perfumeImg/조말론_잉글리쉬페어앤프리지아.png',
  },
  {
    id: 1,
    brand: '조말론',
    name: '우드 세이지 앤 씨 솔트 코롱',
    topNote: ['암브레트 씨'],
    heartNote: ['씨 쏠트'],
    baseNote: ['세이지'],
    imgUrl: '/perfumeImg/조말론_우드세이지앤시솔트.png',
  },
  {
    id: 2,
    brand: '조말론',
    name: '블랙베리 앤 베이 코롱',
    topNote: ['블랙베리'],
    heartNote: ['월계수 잎'],
    baseNote: ['시더우드'],
    imgUrl: '/perfumeImg/조말론_블랙베리앤베이.png',
  },
  {
    id: 3,
    brand: '조말론',
    name: '와일드 블루벨 코롱',
    topNote: ['블루벨'],
    heartNote: ['감'],
    baseNote: ['화이트 머스크'],
    imgUrl: '/perfumeImg/조말론_와일드블루벨.png',
  },
  {
    id: 4,
    brand: '조말론',
    name: '포피 앤 바알리 코롱',
    topNote: ['블랙커런트'],
    heartNote: ['양귀비꽃'],
    baseNote: ['보리'],
    imgUrl: '/perfumeImg/조말론_포피앤바알리.png',
  },
  {
    id: 20,
    brand: '클린',
    name: '클래식 웜 코튼 EDP',
    topNote: ['시트러스', '베버나'],
    heartNote: ['오렌지 플라워', '마린'],
    baseNote: ['푸제르', '머스크'],
    imgUrl: '/perfumeImg/클린_웜코튼.png',
  },
];

export const brnadList = [...new Set(perfumeList.map((perfume) => perfume.brand))];
