'use client';
import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import FilterList, { FilterListElement } from '../common/FilterList';

interface DropDownProps {
  title: string;
  dropDownList: FilterListElement[];
}

function DropDown({ title, dropDownList }: DropDownProps) {
  const [isOpend, setIsOpened] = useState(false);

  return (
    <div className="text-stone-600">
      <div
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => {
          setIsOpened(!isOpend);
        }}
      >
        <span className="font-bold">{title}</span>
        <FaAngleRight className={`transition-transform${isOpend ? ' rotate-90' : ''}`} size={18} />
      </div>
      {isOpend && <FilterList list={dropDownList} type={'note'} />}
    </div>
  );
}

export default DropDown;
