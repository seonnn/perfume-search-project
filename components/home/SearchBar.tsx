import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchBar() {
  return (
    <label className="relative">
      <input className="flex text-sm text-stone-700 pl-3 pr-7 py-1.5 bg-stone-200 w-full rounded my-2" />
      <button className="absolute top-1.5 right-2 bg-stone-200">
        <AiOutlineSearch size={20} />
      </button>
    </label>
  );
}

export default SearchBar;
