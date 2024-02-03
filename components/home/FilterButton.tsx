'use client';
import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import FilterMenuModal from './FilterMenuModal';
import { Brand, FragranceNoteList } from '@/types';
import { createPortal } from 'react-dom';

interface FilterButtonProps {
  noteList: FragranceNoteList[];
  brandList: Brand[];
}

function FilterButton({ noteList, brandList }: FilterButtonProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleIsFilterModalOpen = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <>
      <button
        onClick={handleIsFilterModalOpen}
        className="xl:hidden absolute right-5 flex items-center gap-2 text-stone-500 border border-stone-400 px-4 py-1 rounded-full max-xs:text-sm"
      >
        <FaFilter />
        <span>필터</span>
      </button>
      {isFilterModalOpen &&
        createPortal(
          <FilterMenuModal
            noteList={noteList}
            brandList={brandList}
            handleIsFilterModalOpen={handleIsFilterModalOpen}
          />,
          document.getElementById('portal') as Element
        )}
    </>
  );
}

export default FilterButton;
