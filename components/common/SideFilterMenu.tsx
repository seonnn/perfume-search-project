import { noteList } from '@/utils/noteList';
import React from 'react';
import DropDown from '../home/DropDown';
import SearchBar from '../home/SearchBar';
import { FaCheckSquare, FaRegCheckSquare } from 'react-icons/fa';
import { brnadList } from '@/utils/noteList';

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
        <ul className="flex flex-col gap-2 py-2 text-sm text-stone-600">
          {brnadList.map((brand: string) => (
            <li className="flex items-center gap-2 pl-2" key={brand}>
              {/* selected */}
              {/* <FaCheckSquare className="text-stone-600" size={16} /> */}
              <FaRegCheckSquare className="text-stone-400" size={16} />
              <span>{brand}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideFilterMenu;
