import { noteList } from '@/utils/noteList';
import React from 'react';
import DropDown from '../home/DropDown';
import SearchBar from '../home/SearchBar';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';
import { brandList } from '@/utils/noteList';
import FilterList from './FilterList';

function SideFilterMenu() {
  return (
    <aside className="w-69 mt-22.5">
      <div className="border-y-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2">Note Filter</h3>
        {Object.keys(noteList).map((fragrance) => (
          <DropDown fragrance={fragrance} key={fragrance} />
        ))}
      </div>
      <div className="border-b-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2">Brands</h3>
        <SearchBar />
        <FilterList list={brandList} />
      </div>
    </aside>
  );
}

export default SideFilterMenu;
