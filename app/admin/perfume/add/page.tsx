'use client';
import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';

// BsPlus

function Page() {
  const [image, setImage] = useState();
  const [brand, setBrand] = useState('');

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBrand(event.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center text-stone-800">
      <h2 className="text-2xl font-bold mb-16">향수 등록</h2>
      <form className="w-full flex flex-col items-center gap-4">
        <div className="w-48 h-48 flex justify-center items-center bg-stone-100 text-stone-600 mb-20">
          <label htmlFor="image">
            <BsPlus size={48} />
          </label>
          <input className="hidden" type="file" accept="image/*" id="image" />
        </div>
        <div className="w-full grid grid-cols-2 gap-8">
          <div className="flex items-center">
            <label className="flex w-24 shrink-0">향수명:</label>
            <input className="flex grow border-1 border-stone-300 p-3" />
          </div>
          <div className="flex items-center">
            <label className="flex w-24 shrink-0">브랜드명:</label>
            <select
              className={`flex grow border-1 border-stone-300 p-3 bg-white ${
                brand ? 'text-stone-600' : 'text-stone-400'
              }`}
              value={brand}
              onChange={handleBrandChange}
            >
              <option value={0} className="text-stone-600" hidden>
                브랜드를 선택해주세요.
              </option>
              <option value={1} className="text-stone-600">
                조말론
              </option>
              <option value={2} className="text-stone-600">
                클린
              </option>
            </select>
          </div>
        </div>
        <div className="w-full flex items-center">
          <label className="flex w-24 shrink-0">탑노트:</label>
          <input className="flex grow border-1 border-stone-300 p-3" />
        </div>
        <div className="w-full flex items-center">
          <label className="flex w-24 shrink-0">미들노트:</label>
          <input className="flex grow border-1 border-stone-300 p-3" />
        </div>
        <div className="w-full flex items-center">
          <label className="flex w-24 shrink-0">베이스노트:</label>
          <input className="flex grow border-1 border-stone-300 p-3" />
        </div>
        <button className="text-white px-8 py-3 bg-beige-400 font-bold text-xl rounded mt-8">향수 등록</button>
      </form>
    </div>
  );
}

export default Page;
