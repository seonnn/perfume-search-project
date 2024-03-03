'use client';
import { useGetPerfumeList } from '@/hooks/queries/usePerfumeListQuery';
import React from 'react';
import PerfumeCards from './PerfumeCards';

function DefaultPerfumeCards() {
  const { data, isLoading } = useGetPerfumeList();

  return <PerfumeCards data={data} isLoading={isLoading} />;
}

export default DefaultPerfumeCards;
