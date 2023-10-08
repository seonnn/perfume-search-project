import React from 'react';
import { IoClose } from 'react-icons/io5';

interface SelectedItemProps {
  text: string;
  handleSelected: () => void;
}

function SelectedItem({ text, handleSelected }: SelectedItemProps) {
  return (
    <span className="flex gap-1 items-center font-bold p-2 text-sm bg-beige-400 text-white rounded ">
      {text}
      <IoClose size={16} onClick={handleSelected} />
    </span>
  );
}

export default SelectedItem;
