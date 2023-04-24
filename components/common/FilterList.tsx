'use client';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import React, { useEffect, useState } from 'react';
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
  const { searchParams, setSearchParams } = useCustomSearchParams<SearchParamsKey>();
  const [queryParams, setQueryParams] = useState<SearchParamsKey>({ note: [], brand: [] });

  const handleFilterSelected = (type: string, id: number) => {
    setQueryParams((prev) => {
      const currentFilterList = prev[type] || [];
      const newFilterList = currentFilterList.includes(id)
        ? currentFilterList.filter((itemId) => itemId !== id)
        : [...currentFilterList, id];
      return { ...prev, [type]: newFilterList };
    });
  };

  useEffect(() => {
    setQueryParams({
      note: [
        ...(searchParams
          ?.get('note')
          ?.split('|')
          .map((string) => +string) || []),
      ],
      brand: [
        ...(searchParams
          ?.get('brand')
          ?.split('|')
          .map((string) => +string) || []),
      ],
    });
  }, [searchParams]);

  useEffect(() => {
    setSearchParams(queryParams);
  }, [queryParams]);

  return (
    <ul className="flex flex-col gap-2 py-1 text-sm">
      {list.map((item) => (
        <FilterItem
          key={item.id}
          item={item.name}
          checked={queryParams[type]?.some((id) => id === item.id)}
          onClick={() => handleFilterSelected(type, item.id)}
        />
      ))}
    </ul>
  );
}

export default FilterList;
