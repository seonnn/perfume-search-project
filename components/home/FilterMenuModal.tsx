import React, { useEffect } from 'react';
import FilterMenu, { FilterMenuProps } from './FilterMenu';
import { IoClose } from 'react-icons/io5';
import Button from '../common/Button';

interface FilterMenuModalProps {
  handleIsFilterModalOpen: () => void;
}

function FilterMenuModal({ handleIsFilterModalOpen }: FilterMenuModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-white p-8 overflow-y-scroll">
      <div className="flex justify-between items-center px-2 text-stone-800">
        <h2 className="text-2xl font-bold my-4 max-xs:text-xl">Filter Options</h2>
        <button onClick={handleIsFilterModalOpen}>
          <IoClose size={28} />
        </button>
      </div>
      <FilterMenu />
      <div className="flex justify-center w-full mt-6">
        <Button text="선택 완료" onClick={handleIsFilterModalOpen} />
      </div>
    </div>
  );
}

export default FilterMenuModal;
