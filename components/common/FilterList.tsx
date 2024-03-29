'use client';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
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

function FilterList({ list, type }: FilterListProps) {
  const { searchParams, setSearchParams } = useCustomSearchParams();

  const handleFilterSelected = (type: string, id: number) => {
    const anotherType = type === 'note' ? 'brand' : 'note';
    const prevFilterList = searchParams.get(type)?.split('|') || [];
    const newFilterList = prevFilterList.includes(String(id))
      ? prevFilterList.filter((itemId) => itemId !== String(id))
      : [...prevFilterList, String(id)];

    setSearchParams({
      [type]: newFilterList,
      [anotherType]: searchParams.get(anotherType)?.split('|') || [],
    });
  };

  return (
    <ul className="flex flex-col gap-2 py-1 text-sm">
      {list.length ? (
        list.map((item) => (
          <FilterItem
            key={item.id}
            item={item.name}
            checked={searchParams
              .get(type)
              ?.split('|')
              .some((id) => id === String(item.id))}
            onClick={() => handleFilterSelected(type, item.id)}
            id={item.id}
          />
        ))
      ) : (
        <div className="py-2">{type === 'note' ? '해당 카테고리는 항목이 없습니다.' : '검색 결과가 없습니다.'}</div>
      )}
    </ul>
  );
}

export default FilterList;
