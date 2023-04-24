import React from 'react';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';

interface FilterItemProps {
  item: string;
  onClick: (item: string) => void;
  checked?: boolean;
}

function FilterItem({ item, onClick, checked }: FilterItemProps) {
  return (
    <li className="flex items-center gap-2 pl-2 py-1 text-stone-600" key={item} onClick={() => onClick(item)}>
      {checked ? (
        <FaCheckSquare className="text-stone-600" size={16} />
      ) : (
        <FaRegCheckSquare className="text-stone-400" size={16} />
      )}

      <input type="checkbox" value={item} className="absolute appearance-none w-4 h-4 cursor-pointer" />
      <label className="cursor-pointer">{item}</label>
    </li>
  );
}

export default FilterItem;
