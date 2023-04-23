'use client';
import React from 'react';
import FilterItem from './FilterItem';

export interface FilterListElement {
  id: number;
  name: string;
}

interface FilterListProps {
  list: FilterListElement[];
  type: string;
}

interface SearchParamsKey {
  [key: string]: number[] | undefined;
  note?: number[];
  brand?: number[];
}

function FilterList({ list, type }: FilterListProps) {
  return (
    <ul className="flex flex-col gap-2 py-1 text-sm">
      {list.map((item) => (
        <FilterItem key={item.id} item={item.name} onClick={() => {}} />
      ))}
    </ul>
  );
}

export default FilterList;
