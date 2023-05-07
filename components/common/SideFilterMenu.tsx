import { fragranceList } from '@/utils/noteList';
import React from 'react';
import DropDown from '../home/DropDown';
import SearchBar from '../home/SearchBar';
import { brandList } from '@/utils/noteList';
import FilterList from './FilterList';
import { NoteList } from '@/types';

interface SideFilterMenuProps {
  noteList: NoteList[];
}

function SideFilterMenu({ noteList }: SideFilterMenuProps) {
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
        <FilterList
          list={brandList.map((brand) => {
            return {
              id: brand.b_id,
              name: brand.b_name,
            };
          })}
          type={'brand'}
        />
      </div>
    </aside>
  );
}

export default SideFilterMenu;
