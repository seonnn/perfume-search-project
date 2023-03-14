import React from 'react';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';

interface FilterItem {
  item: string;
}

function FilterItem({ item }: FilterItem) {
  return (
    <li className="flex items-center gap-2 pl-2 py-1 text-stone-600" key={item}>
      {/* selected */}
      {/* <FaCheckSquare className="text-stone-600" size={16} /> */}
      <FaRegCheckSquare className="text-stone-400 cursor-pointer" size={16} />
      <span className="cursor-pointer">{item}</span>
    </li>
  );
}

export default FilterItem;
