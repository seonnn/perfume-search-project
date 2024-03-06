'use client';
import React from 'react';
import { fragranceList } from '@/utils/fragranceList';
import DropDown from './DropDown';
import SearchBar from './SearchBar';
import FilterList from '../common/FilterList';
import { Brand, FragranceNoteList } from '@/types';
import { useGetPerfumeNoteBrandList } from '@/hooks/queries/usePerfumeNoteBrandList';
import RecentSearchKeywords from './RecentSearchKeywords';

export interface FilterMenuProps {
  noteList?: FragranceNoteList[];
  brandList?: Brand[];
}

function FilterMenu() {
  const [, { data: noteList }, { data: brandList }] = useGetPerfumeNoteBrandList();

  return (
    <React.Fragment>
      <div className="border-y-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2 max-xs:text-lg">Note Filter</h3>
        {noteList &&
          fragranceList.map((fragrance) => (
            <DropDown title={fragrance.name} key={fragrance.id} dropDownList={noteList[fragrance.id - 1].noteList} />
          ))}
      </div>
      <div className="border-b-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2 max-xs:text-lg">Brands</h3>
        {brandList && <FilterList list={brandList} type={'brand'} />}
      </div>
      <div className="border-b-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2 max-xs:text-lg">Perfume Name</h3>
        <SearchBar placeholder="향수 이름을 검색해보세요." />
        <RecentSearchKeywords />
      </div>
    </React.Fragment>
  );
}

export default FilterMenu;
