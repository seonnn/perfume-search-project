'use client';
import React from 'react';
import { useGetFilteredPerfumeList } from '@/hooks/queries/usePerfumeListQuery';
import Loading from '../common/Loading';
import PerfumeCards from './PerfumeCards';

interface FilteredPerfumeCardsProps {
  notes: string;
  brands: string;
}

function FilteredPerfumeCards({ notes, brands }: FilteredPerfumeCardsProps) {
  const { data, isLoading } = useGetFilteredPerfumeList(notes, brands);

  if (isLoading) return <Loading />;
  return <PerfumeCards data={data} isLoading={isLoading} />;
}

export default FilteredPerfumeCards;
