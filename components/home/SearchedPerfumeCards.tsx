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
  const { data, isLoading } = useGetFilterAndSearchPerfumeList(keyword, notes, brands);
  return <PerfumeCards data={data} isLoading={isLoading} />;
}

export default SearchedPerfumeCards;
