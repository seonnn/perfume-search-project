import React, { useEffect } from 'react';
import FilterMenu, { FilterMenuProps } from './FilterMenu';
import { IoClose } from 'react-icons/io5';
import Button from '../common/Button';

interface FilterMenuModalProps extends FilterMenuProps {
  handleIsModalOpened: () => void;
}

function FilterMenuModal({ noteList, brandList, handleIsModalOpened }: FilterMenuModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white z-30 p-8 overflow-y-scroll">
      <div className="flex justify-between items-center px-2 text-stone-800">
        <h2 className="text-2xl font-bold my-4 max-xs:text-xl">Filter Options</h2>
        <button
          onClick={() => {
            handleIsModalOpened();
          }}
        >
          <IoClose size={28} />
        </button>
      </div>
      <FilterMenu noteList={noteList} brandList={brandList} />
      <div className="flex justify-center w-full mt-6">
        <Button text="선택 완료" onClick={handleIsModalOpened} />
      </div>
    </div>
  );
}

export default FilterMenuModal;
