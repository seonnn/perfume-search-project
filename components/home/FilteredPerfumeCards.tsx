'use client';
import React from 'react';
import { useGetFilteredPerfumeList } from '@/hooks/queries/usePerfumeListQuery';
import PerfumeCards from './PerfumeCards';
import Loading from '../common/Loading';

interface FilteredPerfumeCardsProps {
  notes: string;
  brands: string;
}

function FilteredPerfumeCards({ notes, brands }: FilteredPerfumeCardsProps) {
  const { data, isFetching } = useGetFilteredPerfumeList(notes, brands);

  if (isFetching) return <Loading />;
  return <PerfumeCards data={data} />;
}

export default FilteredPerfumeCards;
