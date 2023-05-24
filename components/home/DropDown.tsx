'use client';
import React, { useMemo, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import FilterList, { FilterListElement } from '../common/FilterList';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';

interface DropDownProps {
  title: string;
  dropDownList: FilterListElement[];
}

function DropDown({ title, dropDownList }: DropDownProps) {
  const { searchParams } = useCustomSearchParams();
  const dropDownIds = dropDownList.map((item) => item.id);
  const defaultDropDownOpenedState = useMemo(() => {
    return dropDownIds.some((id) =>
      searchParams
        .get('note')
        ?.split('')
        .some((paramsId) => paramsId === String(id))
    );
  }, [dropDownIds, searchParams.get('note')]);
  const [isOpened, setIsOpened] = useState(defaultDropDownOpenedState);

  return (
    <div className="text-stone-600">
      <div
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => {
          setIsOpened(!isOpened);
        }}
      >
        <span className="font-bold">{title}</span>
        <FaAngleRight className={`transition-transform${isOpened ? ' rotate-90' : ''}`} size={18} />
      </div>
      {isOpened && <FilterList list={dropDownList} type={'note'} />}
    </div>
  );
}

export default DropDown;
