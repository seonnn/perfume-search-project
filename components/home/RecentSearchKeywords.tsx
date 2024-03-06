import { searchKeywordAtom } from '@/recoil/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IoClose } from 'react-icons/io5';

const RecentSearchKeywords = () => {
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordAtom);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCloseButtonClick = (target: string) => {
    const keywordIdx = searchKeyword.findIndex((keyword) => keyword === target);
    const newSearchKeyword = searchKeyword.filter((_, idx) => idx !== keywordIdx);
    setSearchKeyword(newSearchKeyword);
  };

  return (
    <ul className="flex flex-wrap gap-1.5 py-1">
      {isClient &&
        searchKeyword.map((keyword) => (
          <li
            key={keyword}
            className="w-fit flex gap-[2px] justify-center items-center border border-stone-400 text-stone-500 text-sm px-2 py-1 rounded-full "
          >
            {keyword}
            <IoClose size={16} onClick={() => handleCloseButtonClick(keyword)} />
          </li>
        ))}
    </ul>
  );
};

export default RecentSearchKeywords;
