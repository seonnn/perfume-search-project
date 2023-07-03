import { Perfume } from '@/types';
import { getPerfumeList } from '@/utils/supabase/getPerfumeList';
import React from 'react';

// export const dynamic = 'force-dynamic';
export const fetchCache = 'force-cache';
export const dynamicParams = true;

export async function generateStaticParams() {
  const perfumeListData = await getPerfumeList();

  return perfumeListData.map((perfume: Perfume) => ({ id: String(perfume.id) }));
}

function PerfumeLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default PerfumeLayout;
