import { Brand, FragranceNoteList } from '@/types';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface SelectedFilterProps {
  noteList: FragranceNoteList[];
  brandList: Brand[];
}

function SelectedFilter({ noteList, brandList }: SelectedFilterProps) {
  const searchParams = useSearchParams();

  return <div>SelectedFilter</div>;
}

export default SelectedFilter;
