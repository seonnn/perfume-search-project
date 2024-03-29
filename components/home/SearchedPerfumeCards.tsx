'use client';
import { useGetFilterAndSearchPerfumeList } from '@/hooks/queries/usePerfumeListQuery';
import React from 'react';
import PerfumeCards from './PerfumeCards';

interface SearchedPerfumeCardsProps {
  keyword: string;
  notes: string;
  brands: string;
}

function SearchedPerfumeCards({ keyword, notes, brands }: SearchedPerfumeCardsProps) {
  const { data } = useGetFilterAndSearchPerfumeList(keyword, notes, brands);
  return <PerfumeCards data={data} />;
}

export default SearchedPerfumeCards;
