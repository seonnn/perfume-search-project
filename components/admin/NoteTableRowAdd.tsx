import React, { useState } from 'react';
import { BsPlusSquare, BsCheckSquare, BsXSquare } from 'react-icons/bs';
import FragranceSelect from './FragranceSelect';

interface NoteTableRowAddProps {
  isNoteAddMode: boolean;
  setIsNoteAddMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function NoteTableRowAdd({ isNoteAddMode, setIsNoteAddMode }: NoteTableRowAddProps) {
  const [fragranceValue, setFragranceValue] = useState('1');
  return (
    <tr className="border-b-1">
      {isNoteAddMode ? (
        <React.Fragment>
          <td></td>
          <td className="text-center py-1">
            <input className="border-1 border-stone-300 py-[3px] px-2" />
          </td>
          <td className="text-center">
            <FragranceSelect defaultValue={fragranceValue} setDefaultValue={setFragranceValue} />
          </td>
          <td className="py-2.5 flex justify-around items-center">
            <button>
              <BsCheckSquare size={20} className="cursor-pointer" />
            </button>
            <BsXSquare size={20} className="cursor-pointer" onClick={() => setIsNoteAddMode(!isNoteAddMode)} />
          </td>
        </React.Fragment>
      ) : (
        <td className="py-2" colSpan={4}>
          <button
            className="flex justify-center items-center gap-2 w-full"
            onClick={() => setIsNoteAddMode(!isNoteAddMode)}
            type="button"
          >
            <BsPlusSquare size={20} />
            노트 추가
          </button>
        </td>
      )}
    </tr>
  );
}

export default NoteTableRowAdd;
