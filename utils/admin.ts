export const adminTableHeader = {
  perfume: ['ID', '이미지', '브랜드', '향수명'],
  note: ['ID', '노트명', '노트 카테고리', '관리'],
  brand: ['ID', '브랜드명', '관리'],
};

export type AdminTableHeader = keyof typeof adminTableHeader;
