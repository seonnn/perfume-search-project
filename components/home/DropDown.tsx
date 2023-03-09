'use client';
import React, { useState } from 'react';
import { noteList } from '@/utils/noteList';
import { FaCheckSquare, FaRegCheckSquare, FaAngleRight } from 'react-icons/fa';

function DropDown({ fragrance }: { fragrance: string }) {
  const [isOpend, setIsOpened] = useState(false);

  return (
    <div className="text-stone-600">
      <div
        className="flex justify-between items-center py-2 cursor-pointer"
        onClick={() => {
          setIsOpened(!isOpend);
        }}
      >
        <span className="font-bold">{fragrance}</span>
        <FaAngleRight className={`transition-transform${isOpend ? ' rotate-90' : ''}`} size={18} />
      </div>
      {isOpend ? (
        <ul className="flex flex-col gap-2 py-2 text-sm">
          {noteList[fragrance].map((note) => (
            <li className="flex items-center gap-2 pl-2" key={note}>
              {/* selected */}
              {/* <FaCheckSquare className="text-stone-600" size={16} /> */}
              <FaRegCheckSquare className="text-stone-400" size={16} />
              <span>{note}</span>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DropDown;
