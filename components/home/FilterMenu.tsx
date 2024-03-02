'use client';
import { fragranceList } from '@/utils/fragranceList';
import React, { useState } from 'react';
import DropDown from './DropDown';
import SearchBar from './SearchBar';
import FilterList from '../common/FilterList';
import { Brand, FragranceNoteList } from '@/types';
import useDebounce from '@/hooks/useDebounce';
import { useGetNoteList } from '@/hooks/queries/useNoteListQuery';
import { useGetBrandList } from '@/hooks/queries/useBrandListQuery';
import Loading from '../common/Loading';

export interface FilterMenuProps {
  noteList?: FragranceNoteList[];
  brandList?: Brand[];
}

function FilterMenu() {
  const { data: noteList, isLoading: noteIsLoading } = useGetNoteList();
  const { data: brandList, isLoading: brandIsLoading } = useGetBrandList();

  const [searchKeyWord, setSearchKeyWord] = useState('');
  const debouncedSearchKeyWord = useDebounce(searchKeyWord, 500);
  const filteredBrandList = debouncedSearchKeyWord
    ? brandList?.filter((brand) => brand.name.includes(debouncedSearchKeyWord))
    : brandList;

  if (noteIsLoading || brandIsLoading) return <Loading />;
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
        {filteredBrandList && <FilterList list={filteredBrandList} type={'brand'} />}
      </div>
      <div className="border-b-1 py-3 px-4">
        <h3 className="text-xl text-stone-800 font-bold py-2 max-xs:text-lg">Perfume Name</h3>
        <SearchBar setSearchKeyWord={setSearchKeyWord} placeholder="향수 이름을 검색해보세요." />
      </div>
    </React.Fragment>
  );
}

export default FilterMenu;
