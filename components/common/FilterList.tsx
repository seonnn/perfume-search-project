import React from 'react';
import FilterItem from './FilterItem';

interface FilterList {
  list: string[];
}

function FilterList({ list }: FilterList) {
  return (
    <ul className="flex flex-col gap-2 py-1 text-sm">
      {list.map((item) => (
        <FilterItem key={item} item={item} />
      ))}
    </ul>
  );
}

export default FilterList;
