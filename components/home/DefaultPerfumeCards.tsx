'use client';
import React from 'react';
import PerfumeCards from './PerfumeCards';
import { useGetPerfumeNoteBrandList } from '@/hooks/queries/usePerfumeNoteBrandList';

function DefaultPerfumeCards() {
  const [{ data }] = useGetPerfumeNoteBrandList();

  return <PerfumeCards data={data} />;
}

export default DefaultPerfumeCards;
