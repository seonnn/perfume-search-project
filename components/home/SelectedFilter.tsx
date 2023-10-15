import { Brand, Note } from '@/types';
import { useSearchParams } from 'next/navigation';
import React from 'react';

interface SelectedFilterProps {
  noteList: Omit<Note, 'fragranceId'>[];
  brandList: Brand[];
}

function SelectedFilter({ noteList, brandList }: SelectedFilterProps) {
  const searchParams = useSearchParams();

  return <div>SelectedFilter</div>;
}

export default SelectedFilter;
