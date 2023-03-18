import React from 'react';
import FilterItem from './FilterItem';

interface FilterListProps {
  list: string[];
}

function FilterList({ list }: FilterListProps) {
  return (
    <ul className="flex flex-col gap-2 py-1 text-sm">
      {list.map((item) => (
        <FilterItem key={item} item={item} />
      ))}
    </ul>
  );
}

export default FilterList;
