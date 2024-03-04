'use client';
import React from 'react';
import { useGetFilteredPerfumeList } from '@/hooks/queries/usePerfumeListQuery';
import PerfumeCards from './PerfumeCards';

interface FilteredPerfumeCardsProps {
  notes: string;
  brands: string;
}

function FilteredPerfumeCards({ notes, brands }: FilteredPerfumeCardsProps) {
  const { data } = useGetFilteredPerfumeList(notes, brands);

  return <PerfumeCards data={data} />;
}

export default FilteredPerfumeCards;
