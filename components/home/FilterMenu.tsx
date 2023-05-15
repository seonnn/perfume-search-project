import { fragranceList } from '@/utils/fragranceList';
import React, { useState } from 'react';
import DropDown from './DropDown';
import SearchBar from './SearchBar';
import FilterList from '../common/FilterList';
import { BrandList, NoteList } from '@/types';
import useDebounce from '@/hooks/useDebounce';

export interface FilterMenuProps {
  noteList: NoteList[];
  brandList: BrandList[];
}

function FilterMenu({ noteList, brandList }: FilterMenuProps) {
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const debouncedSearchKeyWord = useDebounce(searchKeyWord, 500);
  const filteredBrandList = debouncedSearchKeyWord
    ? brandList.filter((brand) => brand.name.includes(debouncedSearchKeyWord))
    : brandList;

  return (
    <React.Fragment>
      <div className="border-y-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2">Note Filter</h3>
        {fragranceList.map((fragrance) => (
          <DropDown title={fragrance.name} key={fragrance.id} dropDownList={noteList[fragrance.id - 1].noteList} />
        ))}
      </div>
      <div className="border-b-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2">Brands</h3>
        <SearchBar setSearchKeyWord={setSearchKeyWord} />
        <FilterList list={filteredBrandList} type={'brand'} />
      </div>
    </React.Fragment>
  );
}

export default FilterMenu;
