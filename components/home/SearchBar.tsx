'use client';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import useDebounce from '@/hooks/useDebounce';
import { searchKeywordAtom } from '@/recoil/atom';
import { handleSearchKeyword } from '@/utils/handleSearchKeyword';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder }: SearchBarProps) {
  const { searchParams, setSearchParams } = useCustomSearchParams();
  const [searchKeyWord, setSearchKeyWord] = useState(searchParams.get('keyword') || '');
  const debouncedSearchKeyword = useDebounce(searchKeyWord, 500);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordAtom);

  useEffect(() => {
    setSearchParams({ keyword: debouncedSearchKeyword });
    if (debouncedSearchKeyword.length) setSearchKeyword(handleSearchKeyword(debouncedSearchKeyword, searchKeyword));
  }, [debouncedSearchKeyword]);

  return (
    <label className="relative">
      <input
        className="flex text-sm text-stone-700 pl-3 pr-7 py-1.5 bg-stone-200 w-full rounded my-2"
        value={searchKeyWord}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchKeyWord(event.target.value)}
        placeholder={placeholder}
      />
      <div className="absolute top-1.5 right-2 bg-stone-200">
        <AiOutlineSearch size={20} />
      </div>
    </label>
  );
}

export default SearchBar;
