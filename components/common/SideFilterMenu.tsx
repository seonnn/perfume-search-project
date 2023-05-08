import { fragranceList } from '@/utils/noteList';
import React from 'react';
import DropDown from '../home/DropDown';
import SearchBar from '../home/SearchBar';
import FilterList from './FilterList';
import { BrandList, NoteList } from '@/types';

interface SideFilterMenuProps {
  noteList: NoteList[];
  brandList: BrandList[];
}

function SideFilterMenu({ noteList, brandList }: SideFilterMenuProps) {
  return (
    <aside className="w-69 mt-22.5">
      <div className="border-y-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2">Note Filter</h3>
        {fragranceList.map((fragrance) => (
          <DropDown title={fragrance.name} key={fragrance.id} dropDownList={noteList[fragrance.id - 1].noteList} />
        ))}
      </div>
      <div className="border-b-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2">Brands</h3>
        <SearchBar />
        <FilterList list={brandList} type={'brand'} />
      </div>
    </aside>
  );
}

export default SideFilterMenu;
