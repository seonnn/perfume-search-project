import React from 'react';
import { FaFilter } from 'react-icons/fa';

interface FilterButtonProps {
  handleIsModalOpened: () => void;
}

function FilterButton({ handleIsModalOpened }: FilterButtonProps) {
  return (
    <button
      onClick={() => handleIsModalOpened()}
      className="xl:hidden absolute right-10 flex items-center gap-2 text-stone-500 border border-stone-400 px-4 py-1 rounded-full"
    >
      <FaFilter />
      <span>필터</span>
    </button>
  );
}

export default FilterButton;
