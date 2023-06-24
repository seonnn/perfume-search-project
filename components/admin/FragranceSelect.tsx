import { fragranceList } from '@/utils/fragranceList';
import React, { useState } from 'react';

interface FragranceSelectProps {
  defaultValue: string;
  setDefaultValue: React.Dispatch<React.SetStateAction<string>>;
}

function FragranceSelect({ defaultValue, setDefaultValue }: FragranceSelectProps) {
  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultValue(event.target.value);
  };
  return (
    <select
      className="border-1 border-stone-300 py-[3px] px-2 bg-white text-stone-600"
      defaultValue={defaultValue}
      onChange={handleChangeValue}
    >
      {fragranceList.map((fragrance) => (
        <option key={fragrance.id} value={fragrance.id}>
          {fragrance.name}
        </option>
      ))}
    </select>
  );
}

export default FragranceSelect;
