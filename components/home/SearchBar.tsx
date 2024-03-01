import React, { Dispatch, SetStateAction } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface SearchBarProps {
  setSearchKeyWord: Dispatch<SetStateAction<string>>;
  placeholder?: string;
}

function SearchBar({ setSearchKeyWord, placeholder }: SearchBarProps) {
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
