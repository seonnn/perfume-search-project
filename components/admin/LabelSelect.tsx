import { Fragrance } from '@/types';
import React from 'react';

interface LabelSelectProps {
  optionList: Fragrance[];
  defaultValue: string;
  setDefaultValue: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
  size?: 'normal' | 'large';
}

function LabelSelect({ optionList, defaultValue, setDefaultValue, label, size = 'normal' }: LabelSelectProps) {
  const handleChangeValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDefaultValue(event.target.value);
  };
  return (
    <React.Fragment>
      {label && <label className="flex w-24 shrink-0">{label}:</label>}
      <select
        className={`border-1 border-stone-300  bg-white text-stone-600${
          size === 'large' ? ' p-3 grow' : ' py-[3px] px-2'
        }`}
        defaultValue={defaultValue}
        onChange={handleChangeValue}
      >
        {optionList.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </React.Fragment>
  );
}

export default LabelSelect;
