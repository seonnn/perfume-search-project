'use client';
import useCustomSearchParams from '@/hooks/useCustomSearchParams';
import useDebounce from '@/hooks/useDebounce';
import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  placeholder?: string;
}

function SearchBar({ placeholder }: SearchBarProps) {
  const { setSearchParams } = useCustomSearchParams();
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const debouncedSearchKeyWord = useDebounce(searchKeyWord, 500);

  useEffect(() => {
    setSearchParams({ keyword: debouncedSearchKeyWord });
  }, [debouncedSearchKeyWord]);

  return (
    <label className="relative">
      <input
        className="flex text-sm text-stone-700 pl-3 pr-7 py-1.5 bg-stone-200 w-full rounded my-2"
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
