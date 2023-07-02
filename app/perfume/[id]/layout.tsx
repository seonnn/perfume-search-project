import { Perfume } from '@/types';
import { getPerfumeList } from '@/utils/supabase/getPerfumeList';
import React from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  const perfumeListData = await getPerfumeList();
  return perfumeListData.map((perfume: Perfume) => ({ id: String(perfume.id) }));
}

function Layout({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default Layout;
