import React, { useState } from 'react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { BsPlusSquare, BsCheckSquare, BsXSquare } from 'react-icons/bs';
import { AdminNote } from '@/types';
import FragranceSelect from './FragranceSelect';

function NoteTableRow({ id, name, fragranceId, fragranceName }: AdminNote) {
  const [isNoteEditMode, setIsNoteEditMode] = useState(false);
  const [fragranceValue, setFragranceValue] = useState(String(fragranceId));

  return isNoteEditMode ? (
    <tr className="border-b-1">
      <td className="text-center py-2">{id}</td>
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
        <BsXSquare size={20} className="cursor-pointer" onClick={() => setIsNoteEditMode(!isNoteEditMode)} />
      </td>
    </tr>
  ) : (
    <tr className="border-b-1" key={id}>
      <td className="text-center py-2">{id}</td>
      <td className="text-center">{name}</td>
      <td className="text-center">{fragranceName}</td>
      <td className="py-2 flex justify-around">
        <FaRegEdit size={20} className="cursor-pointer" onClick={() => setIsNoteEditMode(!isNoteEditMode)} />
        <FaRegTrashAlt size={20} className="cursor-pointer" />
      </td>
    </tr>
  );
}

export default NoteTableRow;
