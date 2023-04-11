'use client';
import React, { useState } from 'react';
import { noteList } from '@/utils/noteList';
import { FaAngleRight } from 'react-icons/fa';
import FilterList from '../common/FilterList';

function DropDown({ fragrance }: { fragrance: string }) {
  const [isOpend, setIsOpened] = useState(false);

  return (
    <div className="text-stone-600">
      <div
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => {
          setIsOpened(!isOpend);
        }}
      >
        <span className="font-bold">{fragrance}</span>
        <FaAngleRight className={`transition-transform${isOpend ? ' rotate-90' : ''}`} size={18} />
      </div>
      {isOpend && <FilterList list={noteList[fragrance]} type={'note'} />}
    </div>
  );
}

export default DropDown;
